from ast import Not
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import filters as search
from django_filters import rest_framework as filters
from apps.communication_scores import serializers
from apps.communications.serializers import CommunicationSerializer
from .serializers import TaskListSerializer, TaskSerializer, AddTaskSerializer
from .models import Task
from apps.communications.serializers import CheckCommunicationTaskSerializer
from apps.users.models import User
from apps.communications.models import Communication
from apps.users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from apps.communication_fields.models import CommunicationField
from apps.communication_scores.models import CommunicationScore
from apps.tasks.serializers import TaskShortInfoSerializer


class TaskFilter(filters.FilterSet):
    session_student_name = filters.CharFilter(lookup_expr="icontains")

    start_date = filters.DateFilter(
        field_name='start_date__date', lookup_expr='gte')
    due_date = filters.DateFilter(
        field_name='due_date__date', lookup_expr='lte')

    class Meta:
        model = Task
        fields = [
            "user_id_assigned_by",
            "user_id_assigned",
            "type",
            "student_support_type",
            "status",
            'start_date',
            'due_date',
        ]


class TaskList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Task.objects.exclude(
            status='deleted').all().order_by('-id')
        if request.login_user.role == 'member' and request.login_user.team not in ['admin']:
            self.queryset = Task.objects.exclude(status='deleted').order_by(
                '-id').filter(Q(user_id_assigned_by__name=request.login_user) | Q(user_id_assigned__name=request.login_user))
        self.filter_backends = [DjangoFilterBackend, search.SearchFilter]
        self.filterset_class = TaskFilter
        self.search_fields = ['session_student_name']
        return self.list(request, *args, **kwargs)


class TaskFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer


class AddTask(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = AddTaskSerializer


class TaskUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CheckCommunication(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        task = self.get_object()
        serializer = TaskShortInfoSerializer(task)
 
        if hasattr(task, 'task_communication') == False:
            communication = Communication.objects.create(task=task)
            communication_fields = CommunicationField.objects.all()

            # create CommunicationScores
            for field in communication_fields:
                CommunicationScore.objects.create(communication=communication, communication_field=field )

           
     
        return Response(serializer.data)
