package com.openelements.benchscape.server.store.entities;

import com.openelements.benchscape.jmh.model.BenchmarkUnit;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity(name = "Measurement")
public class MeasurementEntity implements EntityBase {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID benchmarkId;

    @Column(nullable = false)
    private Instant timestamp;

    @Column(nullable = false, name = "measurement")
    private double value;

    @Column
    private Double error;

    @Column
    private Double min;

    @Column
    private Double max;

    @Column(nullable = false)
    private BenchmarkUnit unit;

    @OneToOne(fetch = FetchType.LAZY, orphanRemoval = true, optional = false, cascade = CascadeType.ALL)
    private MeasurementMetadataEntity metadata;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getBenchmarkId() {
        return benchmarkId;
    }

    public void setBenchmarkId(UUID benchmarkId) {
        this.benchmarkId = benchmarkId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Double getError() {
        return error;
    }

    public void setError(Double error) {
        this.error = error;
    }

    public Double getMin() {
        return min;
    }

    public void setMin(Double min) {
        this.min = min;
    }

    public Double getMax() {
        return max;
    }

    public void setMax(Double max) {
        this.max = max;
    }

    public BenchmarkUnit getUnit() {
        return unit;
    }

    public void setUnit(BenchmarkUnit unit) {
        this.unit = unit;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public MeasurementMetadataEntity getMetadata() {
        return metadata;
    }

    public void setMetadata(MeasurementMetadataEntity metadata) {
        this.metadata = metadata;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MeasurementEntity that = (MeasurementEntity) o;
        return Double.compare(value, that.value) == 0 && Objects.equals(id, that.id)
                && Objects.equals(benchmarkId, that.benchmarkId) && Objects.equals(timestamp,
                that.timestamp) && Objects.equals(error, that.error) && Objects.equals(min, that.min)
                && Objects.equals(max, that.max) && unit == that.unit;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, benchmarkId, timestamp, value, error, min, max, unit);
    }
}