from django.shortcuts import render
from rest_framework.response import Response
from .models import MemberLeave
from apps.users.models import User
from django_filters import rest_framework as filters
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
from .serializers import MemberLeaveAddSerializer, MemberLeaveSerializer, MemberLeaveListSerializer
from rest_framework import serializers
from django.db.models import Q
from config.constants import LEAVE_PERMISSION
# Create your views here.


class MemberLeaveFilter(filters.FilterSet):
    user = filters.CharFilter(lookup_expr='icontains')
    status = filters.CharFilter(lookup_expr='icontains')
    to_date = filters.CharFilter(field_name='to_date', lookup_expr='gte')
    from_date = filters.CharFilter(field_name='from_date', lookup_expr='lte')

    class Meta:
        model = MemberLeave
        fields = [
            'user',
            'status',
            'from_date',
            'to_date',
            'message'
        ]


class MemberLeavesList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = MemberLeave.objects.all().order_by('-id')
    serializer_class = MemberLeaveListSerializer
    def get(self, request, *args, **kwargs):
        if (request.login_user.role in ['member']):
            self.queryset = MemberLeave.objects.all().order_by(
                '-id').filter(Q(user__name = request.login_user))
        return self.list(request, *args, **kwargs)

class MemberLeavesFind( CustomLoginRequiredMixin,generics.RetrieveAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveListSerializer


class MemberLeaveAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveAddSerializer

    def post(self, request, *args, **kwargs):
        # Set the user who login
        request.data['user'] = { "id": request.login_user.id, "name":request.login_user.name}

        return self.create(request, *args, **kwargs)


class MemberLeaveUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveSerializer

    def put(self, request, pk, format=None):
        if (request.data['status'] == 'forwarded' and request.login_user.role not in ['co-ordinator']):
            raise serializers.ValidationError(
                {"error": "You can't forward this request."})
        if (request.login_user.role in LEAVE_PERMISSION):
            if (request.data['status'] not in LEAVE_PERMISSION[request.login_user.role]):
                raise serializers.ValidationError(
                    {"error": "You can't update this Leave Status"})

        member_leave = self.get_object()
        member_leave.user = User.objects.get(pk=request.login_user.id)
        member_leave.status = request.data['status']
        member_leave.from_date = request.data['from_date']
        member_leave.to_date = request.data['to_date']
        member_leave.message = request.data['message']
        member_leave.save()
        serializer = MemberLeaveSerializer([member_leave], many=True)
        return Response(serializer.data)

 
