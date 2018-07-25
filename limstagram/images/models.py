from django.db import models
from limstagram.users import models as user_models

# Create your models here.
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
    

class Comment(TimeStampedModel):
    
    """ Comment Model """
    # 내용, 작성자, 이미지
    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.message
    

class Like(TimeStampedModel):

    """ Like Model """
    # 작성자, 이미지
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
    