from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

class Feed(APIView):

    def get(self, request, format=None):

        user = request.user
        following_users = user.following.all()

        image_list = []

        for following_user in following_users:
            user_images = following_user.images.all()

            for image in user_images:
                image_list.append(image)
        
        ## sorted_list = sorted(image_list, key=get_key, reverse=True)
        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)
        
        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(serializer.data)
##
## def get_key(image):
##    return image.created_at

class LikeImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user
        # 해당 이미지가 없을 경우 404 페이지 예외처리
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoseNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # 좋아요 구현
        try:
            preexisiting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )
            preexisiting_like.delete()
            
            # No Content
            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoseNotExist:
            new_like = models.Like.objects.create(
                creator = user,
                image = found_image
            )
            new_like.save()
            # 성공
            return Response(status=status.HTTP_201_CREATED)

class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):
        
        return Response(status = status.HTTP_200_OK)