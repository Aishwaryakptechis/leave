import datetime 
from rest_framework import generics
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.db.models import Q, Avg
from .models import Communication
from apps.communication_scores.models import CommunicationScore
from apps.communication_fields.models import CommunicationField
from apps.users.mixins import CustomLoginRequiredMixin
from apps.users.models import User
from .serializers import CommunicationListSerializer, CommunicationSerializer, CommunicationFindSerializer, CommunicationUpdateSerializer


class CommunicationFilter(filters.FilterSet):
    engineer_name = filters.CharFilter(lookup_expr='icontains'),
    reviewed_by = filters.CharFilter(lookup_expr='icontains'),
    session_student_name = filters.CharFilter(
        field_name="task__session_student_name", lookup_expr='icontains')

    date_reviewed = filters.DateFilter(
        field_name='date_reviewed', lookup_expr='lte'
    )

    class Meta:
        model = Communication
        fields = ['task', 'reviewed_by',
                  'critical_total', 'general_total', 'error_total', 'session_student_name']


class ComunnicationList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationListSerializer


class AddCommunication(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationSerializer


class CommunicationUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationUpdateSerializer

    def put(self, request, pk, format=None):
        communication_scores = request.data.pop('communication_scores')
        communication = self.get_object()
        communication.reviewed_by = User.objects.get(pk=request.login_user.id)
        communication.save()

        serializer = CommunicationUpdateSerializer(communication)

        communication_fields = CommunicationField.objects.all().values_list('id', flat=True)

        for score in communication_scores:
            if 'communication_field' in score and score['communication_field'] in communication_fields and score['communication'] == communication.id:
                if 'id' in score:
                    # we found id in score list

                    object_score = CommunicationScore.objects.filter(
                        pk=score['id'], communication_field=score['communication_field'], communication=communication).update(score=score['score'], comment=score['comment'])
                else:
                    # id not found is maybe it's new field
                    # check if score is exist communication_field
                    # else create new score
                    object_score = CommunicationScore.objects.filter(
                        communication_field=score['communication_field'], communication=communication).update(score=score['score'], comment=score['comment'])
                    if not object_score:
                        CommunicationScore.objects.create(communication=communication, communication_field=CommunicationField.objects.get(
                            pk=score['communication_field']), score=score['score'], comment=score['comment'])

        # get field ids by type
        error_field_ids = CommunicationField.objects.filter(communication_type="error").values_list('id', flat=True)
        general_field_ids = CommunicationField.objects.filter(communication_type="general").values_list('id', flat=True)
        critical_field_ids = CommunicationField.objects.filter(communication_type="critical").values_list('id', flat=True)

        # calcuate average by type
        avg_score_error = CommunicationScore.objects.filter(communication_field__in=error_field_ids).aggregate(Avg('score'))['score__avg'] / 5 * 100
        avg_score_general = CommunicationScore.objects.filter(communication_field__in=general_field_ids).aggregate(Avg('score'))['score__avg'] / 5 * 100
        avg_score_critical = CommunicationScore.objects.filter(communication_field__in=critical_field_ids).aggregate(Avg('score'))['score__avg'] / 5 * 100
        # save to database
        communication.critical_total = avg_score_critical
        communication.general_total = avg_score_general
        communication.error_total = avg_score_error
        communication.date_reviewed = datetime.datetime.now()
        communication.save()

        return Response(serializer.data)


class FindCommunication(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Communication.objects.all()
    serializer_class = CommunicationFindSerializer
