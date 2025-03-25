from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Project
from .serializers import ProjectSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()

# Base class with shared functionality
class BaseView(APIView):
    def get_user_from_token(self, request):
        """
        Helper function to extract the user from the JWT token.
        """
        auth_header = request.headers.get("Authorization")
        if not auth_header or "Bearer" not in auth_header:
            return None

        token = auth_header.split(" ")[1]  # Extract the token from "Bearer <token>"
        try:
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)  # Get the user from the token
            return user
        except Exception as e:
            print(f"Error decoding token: {e}")
            return None


class ProjectView(BaseView):
    def post(self, request):
        user = self.get_user_from_token(request)
        if not user:
            return Response({"error": "Invalid or missing token"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)  # Associate the project with the user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, name):
        user = self.get_user_from_token(request)
        if not user:
            return Response({"error": "Invalid or missing token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            project = Project.objects.get(name=name, user=user)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, name=None):
        user = self.get_user_from_token(request)
        if not user:
            return Response({"error": "Invalid or missing token"}, status=status.HTTP_401_UNAUTHORIZED)

        if name:
            try:
                project = Project.objects.get(name=name, user=user)
                serializer = ProjectSerializer(project)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Project.DoesNotExist:
                return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            projects = Project.objects.filter(user=user)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectDeleteView(BaseView):
    def delete(self, request, pk):
        user = self.get_user_from_token(request)
        if not user:
            return Response({"error": "Invalid or missing token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            project = Project.objects.get(id=pk, user=user)
            project.delete()
            return Response({"message": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)