from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

class ListAllImages(APIView):

    def get(self, request, format=None):
        # 모든 이미지를 불러옴
        all_images = models.Image.objects.all()
        # 모든 이미지를 시리얼라이즈 (변환)
        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)
