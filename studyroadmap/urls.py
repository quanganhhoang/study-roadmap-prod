from django.urls import include, path, re_path
from django.conf.urls import include
from django.views.generic import TemplateView

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
# from .views import UserViewSet, RoadmapViewSet
from rest_framework_extensions.routers import NestedRouterMixin

from . import views

# routers.DefaultRouter exposes API view
# use routers.SimpleRouter to hide this
class NestedSimpleRouter(NestedRouterMixin, routers.SimpleRouter):
    pass


router = NestedSimpleRouter()

users_router = router.register('api/users', views.UserViewSet, 'user')
roadmaps_router = router.register('api/roadmaps', views.RoadmapViewSet, 'roadmaps')
router.register('api/milestones', views.MilestoneViewSet, 'milestone')
router.register('api/userprofile', views.CustomProfileViewSet, 'profile')

# retrieve roadmaps followed by a user
users_router.register(
    prefix="roadmaps",
    viewset=views.RoadmapViewSet,
    basename="user-roadmaps",
    parents_query_lookups=['author_id']
)

# retrieve milestones in a roadmap
roadmaps_router.register(
    prefix="milestones",
    viewset=views.MilestoneViewSet,
    basename="roadmap-milestones",
    parents_query_lookups=['roadmap_id']
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = router.urls

# urlpatterns = [
#     path('api/users', views.user_list),
#     path('api/users/<int:pk>/', views.user_detail),
# ]

# urlpatterns = [
#   path('api/users/', views.UserList.as_view()),
#   path('api/users/<int:pk>/', views.UserDetail.as_view()),
#   path('api/roadmaps/', views.RoadmapList.as_view()),
#   path('api/roadmaps/<int:pk>/', views.RoadmapList.as_view()),
#   re_path(r'.*', views.index)
# ]

# urlpatterns += [
#     path('api-auth/', include('rest_framework.urls')),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)
