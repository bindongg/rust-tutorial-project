package com.rust.website.common.cache;

import
com.rust.website.common.config.jwt.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.TimeUnit;
@Service
@RequiredArgsConstructor
public class RedisService {
    private final StringRedisTemplate stringRedisTemplate;
    public String getRedisStringValue(String key)
    {
        ValueOperations<String, String> stringStringValueOperations = stringRedisTemplate.opsForValue();
        return stringStringValueOperations.get(key);
    }

    public void setRedisStringValue(String key, String value)
    {
        ValueOperations<String, String> stringStringValueOperations = stringRedisTemplate.opsForValue();
        stringStringValueOperations.set(key, value);
        stringRedisTemplate.expire(key, JwtProperties.EXPIRATION_TIME_ACCESS/1000, TimeUnit.SECONDS);
    }

    public void setRedisRefreshObjectValue(String key, String value) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
        stringRedisTemplate.expire(key, JwtProperties.EXPIRATION_TIME_REFRESH / 1000, TimeUnit.SECONDS);
    }

    public void delRedisStringValue(String key)
    {
        stringRedisTemplate.delete(key);
    }
}
