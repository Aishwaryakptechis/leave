from datetime import datetime
from django.shortcuts import render
from rest_framework.response import Response
from .models import MemberLeave
from apps.users.models import User
from django_filters import rest_framework as filters
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as search
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
from .serializers import MemberLeaveAddSerializer, MemberLeaveListSerializer, MemberLeaveSerializer
from rest_framework import serializers
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
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = MemberLeave.objects.all().order_by('-id')
        if request.login_user.role =='member':
            self.queryset = MemberLeave.objects.order_by('-id').filter(Q(user=request.login_user))
            self.filter_backends = [DjangoFilterBackend,search.SearchFilter]
            self.filterset_class = MemberLeaveFilter
            self.search_fields = ["from_date","to_date"]
        return self.list(request, *args, **kwargs)


class MemberLeaveAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveAddSerializer



class MemberLeaveUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveSerializer

    def put(self, request, pk, format=None):
        member_leave = self.get_object()
        member_leave.user = User.objects.get(pk=request.login_user.id)
        member_leave.status = request.data['status']

        member_leave.from_date = request.data['from_date']
        member_leave.to_date = request.data['to_date']
        
        leave_days = int(str(abs(datetime.strptime(member_leave.to_date, "%Y-%m-%d") -
                         datetime.strptime(member_leave.from_date, "%Y-%m-%d")))[:2].strip())
       
                         
        status_case1 = ['forwarded', 'req_modification']
        status_case2 = ['rejected', 'approved']
        roles = ['leader', 'manager', 'director', 'co-ordinator']
        status = request.data['status']

        if(status in status_case2 and request.login_user.role in roles):
            if (leave_days > 1 and request.login_user.role == 'co-ordinator'):
                raise serializers.ValidationError(
                    {"error": "You can't Approve or Reject the leave"})
                
        if (status in status_case1 and request.login_user.role != "co-ordinator"):
            raise serializers.ValidationError({"error":"You can't forward the leave"})
        

        member_leave.message = request.data['message']
        member_leave.save()
        serializer = MemberLeaveSerializer([member_leave], many=True)
        return Response(serializer.data)


class MemberLeaveFind(CustomLoginRequiredMixin,generics.RetrieveAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveSerializer
