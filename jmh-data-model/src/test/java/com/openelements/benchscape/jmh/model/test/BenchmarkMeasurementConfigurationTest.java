package com.openelements.benchscape.jmh.model.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.openelements.benchscape.jmh.model.BenchmarkMeasurementConfiguration;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;

public class BenchmarkMeasurementConfigurationTest {

    @Test
    public void testValidConstruction() {
        int iterations = 100;
        long time = 2000; // 2 seconds
        TimeUnit timeUnit = TimeUnit.SECONDS;
        int batchSize = 10;

        BenchmarkMeasurementConfiguration configuration = new BenchmarkMeasurementConfiguration(iterations, time,
                timeUnit, batchSize);

        assertEquals(iterations, configuration.iterations());
        assertEquals(time, configuration.time());
        assertEquals(timeUnit, configuration.timeUnit());
        assertEquals(batchSize, configuration.batchSize());
    }

    @Test
    public void testInvalidIterations() {
        int iterations = 0;
        long time = 2000; // 2 seconds
        TimeUnit timeUnit = TimeUnit.SECONDS;
        int batchSize = 10;

        assertThrows(IllegalArgumentException.class,
                () -> new BenchmarkMeasurementConfiguration(iterations, time, timeUnit, batchSize));
    }

    @Test
    public void testInvalidTime() {
        int iterations = 100;
        long time = 0;
        TimeUnit timeUnit = TimeUnit.SECONDS;
        int batchSize = 10;

        assertThrows(IllegalArgumentException.class,
                () -> new BenchmarkMeasurementConfiguration(iterations, time, timeUnit, batchSize));
    }

    @Test
    public void testNullTimeUnit() {
        int iterations = 100;
        long time = 2000; // 2 seconds
        int batchSize = 10;

        assertThrows(NullPointerException.class,
                () -> new BenchmarkMeasurementConfiguration(iterations, time, null, batchSize));
    }

    @Test
    public void testInvalidBatchSize() {
        int iterations = 100;
        long time = 2000; // 2 seconds
        TimeUnit timeUnit = TimeUnit.SECONDS;
        int batchSize = 0;

        assertThrows(IllegalArgumentException.class,
                () -> new BenchmarkMeasurementConfiguration(iterations, time, timeUnit, batchSize));
    }
}