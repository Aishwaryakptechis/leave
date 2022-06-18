from apps.communications.models import Communication
from apps.users.serializers import UserInfoSerializer
from .models import Task
from rest_framework import serializers
from apps.communication_fields.models import CommunicationField
from apps.communication_scores.models import CommunicationScore
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
           

class AddTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id',
            'status',
            'name',
            'type',
            'duration',
            'start_date',
            'due_date',
            'note',
            'student_support_type',
            'session_topic',
            'session_feedback',
            'session_student_name',
            'session_video_link',
            'created_at',
            'updated_at',
            'user_id_assigned_by',
            'user_id_assigned'
        ]
        # depth = 1

    def create(self, validated_data):
        data = validated_data
        task = Task.objects.create(**data)
        communication = Communication.objects.create(task=task)
        communication_fields = CommunicationField.objects.all()

        # create CommunicationScores
        for field in communication_fields:
            CommunicationScore.objects.create(communication=communication, communication_field=field )
        return task





class TaskListSerializer(serializers.ModelSerializer):
    user_id_assigned_by = UserInfoSerializer()
    user_id_assigned = UserInfoSerializer()
    class Meta:
        model = Task
        fields = '__all__'
        depth = 2


class TaskShortInfoSerializer(serializers.ModelSerializer):
    from apps.communications.serializers import CheckCommunicationTaskSerializer
    task_communication = CheckCommunicationTaskSerializer()
    user_id_assigned_by = UserInfoSerializer()
    user_id_assigned = UserInfoSerializer()
    class Meta:
        model = Task
        fields = [
            'id',
            'status',
            'name',
            'type',
            'duration',
            'user_id_assigned_by',
            'user_id_assigned',
            'task_communication'
        ]

        depth = 0


class TaskFindSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'
        depth = 2

   
