package com.openelements.benchscape.server.store.data;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EnvironmentTests {

    @Test
    void testNullName() {
        Assertions.assertThrows(NullPointerException.class, () -> {
            new Environment(UUID.randomUUID(), null, "", "",
                    "", "",
                    3, 1,
                    5, 6L,
                    2L, 10L,
                    "", "",
                    "", "",
                    "", OperationSystem.MAC_OS, "", "", "");
        });
    }
}
