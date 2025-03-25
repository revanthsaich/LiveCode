from django.urls import path
from .views import ProjectView,ProjectDeleteView

urlpatterns = [
    path('', ProjectView.as_view(), name='project-list'),
    path('<str:name>/', ProjectView.as_view(), name='project-detail'),
    path("delete/<int:pk>/", ProjectDeleteView.as_view(), name="project-delete"),
]