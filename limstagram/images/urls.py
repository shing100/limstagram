from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("", view=views.Images.as_view(), name="feed"),
    path("profileImages/", view=views.ProfileImages.as_view(), name="profile"),
    path("<int:image_id>/", view=views.ImageDetail.as_view(), name="image_detail"),
    path("<int:image_id>/likes/", view=views.LikeImage.as_view(), name="like_image"),
    path("<int:image_id>/unlikes/", view=views.unLikeImage.as_view(), name="unlike_image"),
    path("<int:image_id>/comments/", view=views.CommentOnImage.as_view(), name="commnet_image"),
    path("<int:image_id>/comments/<int:comment_id>/", view=views.ModerateComments.as_view(), name="commnet_image"),
    path("comments/<int:comment_id>/", view=views.Comment.as_view(), name="comment"),
    path("search/", view=views.Search.as_view(), name="search")
]
