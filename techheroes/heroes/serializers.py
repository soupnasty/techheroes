from rest_framework import serializers

from accounts.serializers import LimitedUserSerializer, UserSerializer

from .models import Hero, HeroAcceptAction


class CreateUpdateHeroSerializer(serializers.Serializer):
    discipline = serializers.CharField(max_length=2)
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=1000)
    short_bio = serializers.CharField(max_length=2000)
    years_of_exp = serializers.IntegerField(min_value=1)
    rate_in_cents = serializers.IntegerField(min_value=0)
    linkedin_url = serializers.URLField()

    def validate_discipline(self, value):
        """Validate if discipline is one of the choices"""
        disciplines = [x[0] for x in Hero.DISCIPLINES]
        if value not in disciplines:
            raise serializers.ValidationError('Discipline must be in {}'.format(disciplines))
        return value


class HeroSerializer(serializers.ModelSerializer):
    user = LimitedUserSerializer(many=False)

    class Meta:
        model = Hero
        fields = ('id', 'user', 'discipline', 'title', 'description', 'years_of_exp',
                    'rate_in_cents', 'created', 'updated')
        read_only_fields = ('id', 'created', 'updated')


class HeroDetailSerializer(HeroSerializer):

    class Meta:
        model = Hero
        fields = ('id', 'user', 'discipline', 'title', 'description', 'short_bio',
                    'years_of_exp', 'rate_in_cents', 'linkedin_url', 'created', 'updated')


class HeroProfileSerializer(HeroSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Hero
        fields = ('id', 'user', 'discipline', 'title', 'description', 'short_bio',
                    'years_of_exp', 'rate_in_cents', 'linkedin_url', 'created', 'updated')


class AcceptDeclineHeroSerializer(serializers.Serializer):
    hero_id = serializers.UUIDField()

    def validate_hero_id(self, value):
        """Check if hero with id exists"""
        if not Hero.objects.filter(id=value).exists():
            raise serializers.ValidationError('Hero with provided hero_id does not exist.')
        return value


class HeroAcceptActionSerializer(serializers.ModelSerializer):

    class Meta:
        model = HeroAcceptAction
        fields = ('user', 'hero', 'accepted', 'timestamp')

