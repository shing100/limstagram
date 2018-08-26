# limstagram

Clonning instagram with python django and react and react native

인스타그램 클론하기 ( 파이선 장고, 리액트, 리엑트 네이티브 )

-----------------------------------------------------
## 사용 환경
    Visual Studio Code
    XCode
    Android Studio
    Genymotion
    Expo (XDE)
    Nodejs
    NPM
    Yarn
    Python 3.6
    pip
    pipenv or anaconda
    Postgres
    Explo Client

## 장고 프로젝트 생성
     cookiecutter https://github.com/pydanny/cookiecutter-django
     pip install -r requirements/local.txt
     - 로컬 파일들을 인스톨함
     cd limstagram
     각자의 앱을 만들기 위한 명령어
     django-admin startapp images
     django-admin startapp notifications
     - 이미지를 업로드 , 사용 할수 있도록 앱을 만들어줌
        limstagram 폴더 및에 이미지폴더 생성됨
     - 이후 base.py 에서 LOCAL_APPS 에 images 추가하기
    
     python manage.py migrate
     python manage.py makemigrations (생성한 모델, 어플레키에션 필드들을 변경시)
     python manage.py makemigrations && python manage.py migrate
     python manage.py createsuperuser (장고 슈퍼유저 생성)


## 알아야 할것들
> Django ORM
>> create(), get(), filter(), delete()
```python
from django.db import models
# 모델 생성
class Cat(models.Model):
    name = models.CharField(max_length=30)
    brees = models.CharField(max_length=30)

# 오브젝트 생성
Cat.object.create(
    name="Fluffy",
    breed="Perian"
)

# 검색
## 아이디를 이용한 검색 및 수정
cat = Cat.objects.get(id=1)
fluffy.name = "Mr. Fluffy"
fluffy.save()

## 필터를 이용한 검색
british_cats = Cat.objects.filter(breed="British")

## 필터 Lookups options = startwith, contains, istartswith, icontainsm, lt , gt, ...
cats = Cat.objects.filter(name__startswith="Mr")
cats = Cat.objects.all()

# delete()
fluffy = Cat.objects.get(id=1)
fluffy.delete()

# foreignKey 모델에 생성
class Owner(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    following = models.ManyToManyField('self')
    followers = models.ManyToManyField('self')

# 외래키 설정하기
from . import Owner
owner = models.ForeignKey(Owner, null=True)

# 저장방법
king = Owner.objects.create(name="king", last_name="lim", age=45)
bunns = Cat.objects.get(id=2)
bunns.owner = king
bunns.save()

# 데이터 접근방법
bunns = Cat.objects.get(id=2)
print(bunns.owner.age)

king = Owner.objects.get(pk=1)
king_cats = king.cat_set.all()
```

## Setting up JWT
    http://getblimp.github.io/django-rest-framework-jwt/    
    
    pip install djangorestframework-jwt
    설치 후 settings.py 에 더하기 쿠키커터의 경우 base.py

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# 그리고 url.py에 추가하여 사용
from rest_framework_jwt.views import obtain_jwt_token
url(r'^api-token-auth/', obtain_jwt_token),
or
path("api-token-auth", obtain_jwt_token),
```

## 기본적인 모델 생성방법
```python
class TimeStampedModel(models.Model):
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        abstract = True

class Image(TimeStampedModel):
    
    """ Image Model """
    # 파일 위치, 파일 이름, 작성자
    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)
```

## 기본적인 URL 연결 방법
```python
# config/urls.py
path(
    "images/",
    include("limstagram.images.urls", namespace="images"),
),

# views.py
class ListAllImages(APIView):

    def get(self, request, format=None):
        # 모든 이미지를 불러옴
        all_images = models.Image.objects.all()
        # 모든 이미지를 시리얼라이즈 (변환)
        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)

# urls.py
from django.urls import path
from . import views

app_name = "images"
urlpatterns = [
    path("all/", view=views.ListAllImages.as_view(), name="all_images"),
]
```

## 주요기능
- 유저 피드
- 이미지 좋아요 수, 리스트 확인
- 좋아요, 좋아요 해제
- 이미지 댓글 확인
- 팔로잉, 팔로워 리스트 확인
- 해시태그 검색
- 유저 검색
- 팔로일, 팔로워
- 알림 확인, 업데이트 확인
- 프로파일 업데이트, 비밀번호 수정
- 회원가입, 로그인, 페이스북 연동
- 이미지 올리기, 삭제, 수정, 
- 내 이미지 댓글, 생성 댓글 삭제

## 참고자료
--------------------

> Class Ingeritance and Models and Fields

- https://docs.djangoproject.com/en/1.11/topics/db/models/
- https://docs.djangoproject.com/en/1.11/ref/models/fields/

> Abstract base classes

- https://docs.djangoproject.com/en/1.11/topics/db/models/#abstract-base-classes
- https://docs.djangoproject.com/en/1.11/ref/models/fields/

> Django Models

- https://docs.djangoproject.com/en/1.11/topics/db/models/
- https://docs.djangoproject.com/en/1.11/ref/models/options/
 
> Django Admin

- https://docs.djangoproject.com/en/1.11/ref/contrib/admin/

> __str__

- https://docs.djangoproject.com/en/1.11/ref/models/instances/#other-model-instance-methods

> Basic RESTful API Design guidelines

- https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9
- https://www.django-rest-framework.org

> Django Rest Framework Serializers

- http://www.django-rest-framework.org/api-guide/serializers/
- http://www.django-rest-framework.org/api-guide/relations/#nested-relationships
- http://www.django-rest-framework.org/api-guide/fields/#readonlyfield

> Request and Response

- https://docs.djangoproject.com/en/1.11/ref/request-response/#attributes-set-by-middleware
- https://docs.djangoproject.com/en/1.11/ref/request-response/
- http://www.django-rest-framework.org/api-guide/requests/#data

> URL dispatcher

- https://docs.djangoproject.com/en/1.11/topics/http/urls/
- https://docs.djangoproject.com/en/2.0/ref/urls/#path

> Middleware

- https://docs.djangoproject.com/en/1.11/topics/http/middleware/
- https://www.agiliq.com/blog/2015/07/understanding-django-middlewares/

> python sort, lambda

- https://www.pythoncentral.io/how-to-sort-a-list-tuple-or-object-with-sorted-in-python/
- https://wikidocs.net/64

> 정규표현식

- https://regex101.com/
- https://suwoni-codelab.com/django/2018/03/24/Django-Url-function/

> django-taggit 해시태깅검색

- https://github.com/alex/django-taggit
- https://django-taggit.readthedocs.io/en/latest/
- https://github.com/glemmaPaul/django-taggit-serializer

> field-lookups

- https://docs.djangoproject.com/en/1.11/topics/db/queries/#field-lookups
- https://docs.djangoproject.com/en/1.11/ref/models/querysets/#values

> partial-updates

- http://www.django-rest-framework.org/api-guide/serializers/#partial-updates

> django.contrib.auth

- https://docs.djangoproject.com/en/1.11/ref/contrib/auth/#django.contrib.auth.models.User.check_password
