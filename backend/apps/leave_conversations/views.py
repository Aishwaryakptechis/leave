from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import BaseFilterBackend
from rest_framework.response import Response
from apps.member_leaves.models import MemberLeave
from apps.member_leaves import serializers
from .models import LeaveConversation
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
from .serializers import LeaveConversationAddSerializer, LeaveConversationSerializer, LeaveConversationListSerializer, LeaveConversationupdateSerializer
from rest_framework import serializers
# Create your views here.


class CustomizeFilterBackend(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        leave_conversation = request.query_params.get(
            "leave_conversation_id", None)
        kwargs = {}
        if leave_conversation:
            kwargs['id__lt'] = leave_conversation
        return queryset.filter(**kwargs)


class LeaveConversationList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationListSerializer
    filter_backends = [DjangoFilterBackend,CustomizeFilterBackend]
    lookup_url_kwarg = 'member_leave_id'

    def get(self,request,*args,**kwargs):
        # Get Query Params
        member_leave_id  = self.kwargs.get(self.lookup_url_kwarg) 
        leave_conversation = LeaveConversation.objects.filter(member_leave_id=member_leave_id)
        serializer = LeaveConversationListSerializer(leave_conversation,many=True)

        return Response(serializer.data) 



class LeaveConversationUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationupdateSerializer


class LeaveConversationAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationAddSerializer


class LeaveConversationDelete(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.DestroyAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationSerializer

    def delete(self, request, *args, **kwargs):
        leave_conversation = LeaveConversation.objects.get(
            pk=self.kwargs['pk'])
        if leave_conversation.user_id.id != request.login_user.id:
            raise serializers.ValidationError(
                {"error": "You can't delete the conversation"})

        return self.destroy(request, *args, **kwargs)
