package com.openelements.jmh.store.frontend.model;

public record TimeseriesTableModel(String dateAndTime, String value, String error, String min,
                                   String max, String processorCount, String memorySize,
                                   String jvmVersion) {

}