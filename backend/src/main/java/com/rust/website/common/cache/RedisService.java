package com.rust.website.common.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

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
        stringRedisTemplate.expire(key, 600, TimeUnit.SECONDS);
    }

    public void delRedisStringValue(String key)
    {
        stringRedisTemplate.delete(key);
    }
}
