from django.urls import path
from .import views
 
urlpatterns = [
    path('', views.ComunnicationList.as_view(), name='communication_list'),
    path('<int:pk>/' ,views.FindCommunication.as_view(), name='communication_show'),
    path('update/<int:pk>/', views.CommunicationUpdate.as_view(), name='communication_update'),
    path('add/', views.AddCommunication.as_view(), name='add_communication'),
    
]
