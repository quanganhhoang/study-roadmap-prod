from django.urls import include, path
from django.conf.urls import include

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
# from .views import UserViewSet, RoadmapViewSet
from . import views

router = routers.DefaultRouter()
router.register('api/users', views.UserViewSet, 'users')
router.register('api/roadmaps', views.RoadmapViewSet, 'roadmaps')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = router.urls

# urlpatterns = [
#     path('api/users', views.user_list),
#     path('api/users/<int:pk>/', views.user_detail),
# ]

# urlpatterns = [
#   path('', views.api_root),
#   path('api/users/', views.UserList.as_view()),
#   path('api/users/<int:pk>/', views.UserDetail.as_view()),
#   path('api/roadmaps/', views.RoadmapList.as_view()),
#   path('api/roadmaps/<int:pk>/', views.RoadmapList.as_view())
# ]

# urlpatterns += [
#     path('api-auth/', include('rest_framework.urls')),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)