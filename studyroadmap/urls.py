from django.urls import include, path, re_path
from django.conf.urls import include
from django.views.generic import TemplateView

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_extensions.routers import NestedRouterMixin

from . import views


class OptionalSlashRouter(routers.SimpleRouter):
    def __init__(self):
        self.trailing_slash = '/?'
        super(routers.SimpleRouter, self).__init__()


# routers.DefaultRouter exposes API view
# use routers.SimpleRouter to hide this
class NestedSimpleRouter(NestedRouterMixin, OptionalSlashRouter):
    pass


router = NestedSimpleRouter()
users_router = router.register('api/users', views.UserViewSet, 'user')
roadmaps_router = router.register('api/roadmaps', views.RoadmapViewSet, 'roadmap')
router.register('api/milestones', views.MilestoneViewSet, 'milestone')
router.register('api/userprofile', views.CustomProfileViewSet, 'profile')

# retrieve roadmaps followed by a user
users_router.register(
    prefix="roadmaps",
    viewset=views.RoadmapViewSet,
    basename="user-roadmaps",
    parents_query_lookups=['author']
)

# retrieve milestones in a roadmap
roadmaps_router.register(
    prefix="milestones",
    viewset=views.MilestoneViewSet,
    basename="roadmap-milestones",
    parents_query_lookups=['roadmap_id']
)

urlpatterns = router.urls

