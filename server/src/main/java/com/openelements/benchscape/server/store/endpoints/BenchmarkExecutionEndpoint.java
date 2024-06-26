package com.openelements.benchscape.server.store.endpoints;


import static com.openelements.benchscape.server.store.endpoints.EndpointsConstants.V2;

import com.openelements.benchscape.jmh.model.BenchmarkExecution;
import com.openelements.benchscape.server.store.services.BenchmarkExecutionService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Objects;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(V2 + "/execution")
public class BenchmarkExecutionEndpoint {

    private final BenchmarkExecutionService benchmarkExecutionService;

    public BenchmarkExecutionEndpoint(final BenchmarkExecutionService benchmarkExecutionService) {
        this.benchmarkExecutionService = Objects.requireNonNull(benchmarkExecutionService,
                "benchmarkExecutionService must not be null");
    }

    @Operation(summary = "Store a given execution")
    @PostMapping
    public void add(@RequestBody final BenchmarkExecution benchmarkExecution) {
        benchmarkExecutionService.store(benchmarkExecution);
    }
}
