package com.openelements.benchscape.server.store.data;

import com.openelements.benchscape.jmh.model.BenchmarkUnit;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

/**
 * Data object of a measurement query. The query is used to find measurements for a specific benchmark.
 *
 * @param benchmarkId    id of the benchmark
 * @param unit           defines the unit in that the measurements should be returned (every measurement will be
 *                       converted)
 * @param start          start of the periode in that a measurement must be
 * @param end            end of the periode in that a measurement must be
 * @param environmentIds ids of environment. A measurement must fit to at least one environment of the list. If the list
 *                       is empty no environment filter will be used.
 * @param gitOriginUrl   Git origin URL (nullable)
 * @param gitBranch      Git branch (nullable)
 */
public record MeasurementQuery(@NonNull String benchmarkId,
                               @NonNull BenchmarkUnit unit,
                               @NonNull Instant start,
                               @NonNull Instant end,
                               @NonNull Collection<String> environmentIds,
                               @Nullable String gitOriginUrl,
                               @Nullable String gitBranch) implements Serializable {

    private static ZoneOffset DEFAULT_ZONE_OFFSET = ZoneOffset.UTC;

    private static Instant DEFAULT_START = Instant.MIN;

    private static Instant DEFAULT_END = Instant.MAX;

    private static BenchmarkUnit DEFAULT_UNIT = BenchmarkUnit.OPERATIONS_PER_MILLISECOND;

    public MeasurementQuery {
        Objects.requireNonNull(benchmarkId, "benchmarkId must not be null");
        Objects.requireNonNull(environmentIds, "environmentIds must not be null");
        Objects.requireNonNull(unit, "unit must not be null");
        Objects.requireNonNull(start, "start must not be null");
        Objects.requireNonNull(end, "end must not be null");
    }

    @NonNull
    public static MeasurementQuery of(@NonNull String benchmarkId) {
        return of(benchmarkId, Set.of());
    }

    @NonNull
    public static MeasurementQuery of(@NonNull UUID benchmarkId) {
        return of(benchmarkId.toString(), Set.of());
    }

    @NonNull
    public static MeasurementQuery of(@NonNull String benchmarkId, @NonNull Collection<String> environmentIds) {
        return of(benchmarkId, DEFAULT_UNIT, environmentIds);
    }

    @NonNull
    public static MeasurementQuery of(@NonNull String benchmarkId, @Nullable BenchmarkUnit unit,
                                      @NonNull Collection<String> environmentIds) {
        return new MeasurementQuery(benchmarkId, unit, DEFAULT_START, DEFAULT_END, environmentIds, null, null);
    }

    @NonNull
    public static MeasurementQuery ofToday(@NonNull String benchmarkId,
                                           @Nullable BenchmarkUnit unit,
                                           @NonNull Collection<String> environmentIds) {
        return new MeasurementQuery(benchmarkId, unit,
                LocalDate.now().atStartOfDay().toInstant(DEFAULT_ZONE_OFFSET),
                LocalDate.now().atStartOfDay().plusDays(1).toInstant(DEFAULT_ZONE_OFFSET),
                environmentIds, null, null);
    }

}
