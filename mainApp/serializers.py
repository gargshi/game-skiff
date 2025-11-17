from rest_framework import serializers
from django.db.models import Avg, Max, Min, Count
from .models import Game, Genre, Rating


class GameSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    genre = serializers.SerializerMethodField()
    avg_rating = serializers.SerializerMethodField()
    highest_rating = serializers.SerializerMethodField()
    lowest_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'title', 'description', 'image', 'link', 'created_at', 'updated_at', 'author', 'genre', 'avg_rating',
                  'highest_rating',
                  'lowest_rating',
                  'rating_count']

    def get_author(self, obj):
        return obj.author.username

    def get_genre(self, obj):
        return obj.genre.genre_name

    def get_avg_rating(self, obj):
        return obj.ratings.aggregate(avg=Avg("rating"))["avg"]

    def get_highest_rating(self, obj):
        return obj.ratings.aggregate(max=Max("rating"))["max"]

    def get_lowest_rating(self, obj):
        return obj.ratings.aggregate(min=Min("rating"))["min"]

    def get_rating_count(self, obj):
        return obj.ratings.count()
