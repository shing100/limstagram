from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from limstagram.users import models as user_models
from limstagram.users import serializers as user_serializers
from limstagram.notifications import views as notification_views

class Images(APIView):

    def get(self, request, format=None):

        user = request.user
        following_users = user.following.all()

        image_list = []

        for following_user in following_users:
            user_images = following_user.images.all()

            for image in user_images:
                image_list.append(image)

        my_images = user.images.all()[:2]

        for image in my_images:
            image_list.append(image)

        ## sorted_list = sorted(image_list, key=get_key, reverse=True)
        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.InputImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##
## def get_key(image):
##    return image.created_at

class LikeImage(APIView):

    def get(self, request, image_id, format=None):
        likes = models.Like.objects.filter(image__id=image_id)

        # print(likes.values())
        # print(likes.values('creator_id'))
        ## arrat 안에 있는 user id 를 찾기

        like_creators_ids = likes.values('creator_id')
        users = user_models.User.objects.filter(id__in=like_creators_ids)

        serializer = user_serializers.ListUserSerializer(users, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, image_id, format=None):

        # notification

        user = request.user
        # 해당 이미지가 없을 경우 404 페이지 예외처리
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # 좋아요 구현
        try:
            preexisiting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )
            # No Content
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:
            new_like = models.Like.objects.create(
                creator = user,
                image = found_image
            )

            new_like.save()
            notification_views.create_notification(user, found_image.creator, 'like', found_image)
            # 성공
            return Response(status=status.HTTP_201_CREATED)

class unLikeImage(APIView):

    def delete(self, request, image_id, format=None):

        user = request.user
        # 해당 이미지가 없을 경우 404 페이지 예외처리
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisiting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )
            preexisiting_like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:
            return Response(status=status.HTTP_304_NOT_MODIFIED)


class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user
        serializer = serializers.CommentSerializer(data=request.data)

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if serializer.is_valid():
            serializer.save(creator=user, image=found_image)
            ## notificarion
            notification_views.create_notification(user, found_image.creator, 'comment', found_image ,serializer.data['message'])

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


# 해시태크 검색을 위한 서치 클랙스
class Search(APIView):

    def get(self, request, format=None):

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None:

            hashtags = hashtags.split(",")
            images = models.Image.objects.filter(tags__name__in=hashtags).distinct()

            serializer = serializers.CountImageSerializer(images, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class ModerateComments(APIView):

    def delete(self, request, image_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.Comment.objects.get(id=comment_id, image__id=image_id, image__creator=user)
            comment_to_delete.delete()
        except models.Comment.DoesNotExits:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ImageDetail(APIView):

    # 자신의 이미지인지 아닌지 확인
    def find_own_image(self, image_id, user):
        try:
            image = models.Image.objects.get(id=image_id, creator=user)
            return image
        except models.Image.DoesNotExist:
            return None

    def get(self, request, image_id, format=None):

        try:
            image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(image)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, requset, image_id, format=None):

        user = requset.user
        image = self.find_own_image(image_id, user)

        if image is not None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # partial 모든 정보를 입력하지 않아도 저장됨
        serializer = serializer.InputImageSerializer(image, data=requset.data, partial=True)

        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, image_id, format=None):

        uesr = request.user

        image = self.find_own_image(image_id, user)

        if image is not None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        image.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
