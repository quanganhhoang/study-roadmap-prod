from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import api_view, action
from rest_framework.reverse import reverse

# from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from .models import *
from .serializers import *


# Iteration 4
# User Viewset
class UserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class CustomProfileViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomProfile.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CustomProfileSerializer


# Roadmap Viewset
class RoadmapViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Roadmap.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoadmapSerializer

    @action(methods=['get'], detail=False, url_path='most-popular')
    def most_popular(self, request):
        most_popular = self.get_queryset().order_by('num_views')
        serializer = self.get_serializer_class()(most_popular, many=True)

        return Response(serializer.data)

    @action(methods=['get'], detail=False, url_path='highest-rated')
    def highest_rated(self, request):
        highest_rated = self.get_queryset().order_by('num_votes')
        serializer = self.get_serializer_class()(highest_rated, many=True)

        return Response(serializer.data)


class DisciplineViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Discipline.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DisciplineSerializer

### Iteration 4 ###

### Iteration 3 ###

# @api_view
# def api_root(request, format=None):
#   return Response({
#     # First, we're using REST framework's reverse function in order to return fully-qualified URLs; 
#     # second, URL patterns are identified by convenience names that we will declare later on in our snippets/urls.py.
#     'users': reverse('user-list', request=request, format=format),
#     'roadmaps': reverse('roadmap-list', request=request, format=format)
#   })  

# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [
#       permissions.IsAuthenticatedOrReadOnly
#     ]


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [
#       permissions.IsAuthenticatedOrReadOnly
#     ]

# class RoadmapList(generics.ListCreateAPIView):
#     queryset = Roadmap.objects.all()
#     serializer_class = RoadmapSerializer
#     permission_classes = [
#       permissions.IsAuthenticatedOrReadOnly
#     ]


# class RoadmapDetail(generics.RetrieveAPIView):
#     queryset = Roadmap.objects.all()
#     serializer_class = RoadmapSerializer
#     permission_classes = [
#       permissions.IsAuthenticatedOrReadOnly
#     ]

### Iteration 3 ###


### Iteration 2 ###

# class UserList(APIView):
#   def get(self, request, format=None):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)

#   def post(self, request, format=None):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserDetail(APIView):
#   def get_object(self, pk):
#     try:
#       return User.objects.get(pk=pk)
#     except User.DoesNotExist:
#       raise Http404

#   def get(self, request, pk, format=None):
#     user = self.get_object(pk)
#     serializer = UserSerializer(user)
#     return Response(serializer.data)

#   def put(self, request, pk, format=None):
#     user = self.get_object(pk)
#     serializer = UserSerializer(user, data=request.data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#   def delete(self, request, pk, format=None):
#     user = self.get_object(pk)
#     user.delete()

#     return Response(status=status.HTTP_204_NO_CONTENT)

### Iteration 2 ###

### Iteration 1 ###

# @api_view(['GET', 'POST'])
# def user_list(request, format=None):
#   if request.method == 'GET':
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return JsonResponse(serializer.data)

#   elif request.method == 'POST':
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
#     return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def user_detail(request, pk, format=None):
#   """
#   Retrieve, update or delete a code snippet.
#   """
#   try:
#     user = User.objects.get(pk=pk)
#   except user.DoesNotExist:
#     return HttpResponse(status=status.HTTP_404_NOT_FOUND)

#   if request.method == 'GET':
#     serializer = UserSerializer(user)
#     return JsonResponse(serializer.data)

#   elif request.method == 'PUT':
#     serializer = UserSerializer(user, data=request.data)
#     if serializer.is_valid():
#       serializer.save()
#       return JsonResponse(serializer.data)
#     return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#   elif request.method == 'DELETE':
#     user.delete()
#     return HttpResponse(status=status.HTTP_204_NO_CONTENT)

### Iteration 1 ###
