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
            # No Content
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoseNotExist:
            new_like = models.Like.objects.create(
                creator = user,
                image = found_image
            )
            new_like.save()
            # 성공
            return Response(status=status.HTTP_201_CREATED)

class unLikeImage(APIView):

    def delete(self, request, image_id, format=None):

        user = request.user
        # 해당 이미지가 없을 경우 404 페이지 예외처리
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoseNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )
            preexisiting_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoseNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user
        serializer = serializers.CommentSerializer(data=request.data)

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoseNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save(creator=user, image=found_image)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class Comment(APIView):

    def delete(self, request, comment_id, format=None):

        user = request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Commnet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):

    def get(self, request, comment_id, format=None):

        hashtags = request.query_params.get('hashtags', None)

        print(hashtags)
