package com.openelements.benchscape.jmh.model.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.openelements.benchscape.jmh.model.BenchmarkInfrastructure;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class BenchmarkInfrastructureTest {

    @Test
    public void testValidConstruction() {
        String arch = "x86_64";
        int availableProcessors = 4;
        long memory = 8192; // 8 GB
        String osName = "Linux";
        String osVersion = "5.4.0";
        String jvmVersion = "11.0.2";
        String jvmName = "OpenJDK";
        String jmhVersion = "1.23";
        Map<String, String> systemProperties = Map.of("FOO", "bar");
        Map<String, String> environmentProperties = Map.of("BAR", "foo");

        BenchmarkInfrastructure infrastructure = new BenchmarkInfrastructure(arch, availableProcessors, memory, osName,
                osVersion, jvmVersion, jvmName, systemProperties, environmentProperties, jmhVersion);

        assertEquals(arch, infrastructure.arch());
        assertEquals(availableProcessors, infrastructure.availableProcessors());
        assertEquals(memory, infrastructure.memory());
        assertEquals(osName, infrastructure.osName());
        assertEquals(osVersion, infrastructure.osVersion());
        assertEquals(jvmVersion, infrastructure.jvmVersion());
        assertEquals(jvmName, infrastructure.jvmName());
        assertEquals(systemProperties, infrastructure.systemProperties());
        assertEquals(environmentProperties, infrastructure.environmentProperties());
        assertEquals(jmhVersion, infrastructure.jmhVersion());
    }

    @Test
    public void testNullArguments() {
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure(null, 4, 8192, "Linux", "5.4.0", "11.0.2", "Temurin", Map.of(),
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, null, "5.4.0", "11.0.2", "Temurin", Map.of(),
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", null, "11.0.2", "Temurin", Map.of(),
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", "5.4.0", null, "Temurin", Map.of(),
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", "5.4.0", "11.0.2", null, Map.of(),
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", "5.4.0", "11.0.2", "Temurin", null,
                        Map.of(), "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", "5.4.0", "11.0.2", "Temurin", Map.of(),
                        null, "1.23"));
        assertThrows(NullPointerException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 8192, "Linux", "5.4.0", "11.0.2", "Temurin", Map.of(),
                        Map.of(), null));
    }

    @Test
    public void testInvalidAvailableProcessors() {
        assertThrows(IllegalArgumentException.class,
                () -> new BenchmarkInfrastructure("x86_64", 0, 8192, "Linux", "5.4.0", "11.0.2", "Temurin", Map.of(),
                        Map.of(), "1.23"));
    }

    @Test
    public void testInvalidMemory() {
        assertThrows(IllegalArgumentException.class,
                () -> new BenchmarkInfrastructure("x86_64", 4, 0, "Linux", "5.4.0", "11.0.2", "Temurin", Map.of(),
                        Map.of(), "1.23"));
    }
}