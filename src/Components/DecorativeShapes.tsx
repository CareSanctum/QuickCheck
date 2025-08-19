import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width: W, height: H } = Dimensions.get("window");

// === Helpers ===
function Circle({
  size,
  left,
  top,
  opacity = 0.04,
}: {
  size: number;
  left: number;
  top: number;
  opacity?: number;
}) {
  return (
    <View
      style={[
        styles.abs,
        {
          width: size,
          height: size,
          left,
          top,
          borderRadius: size / 2,
          backgroundColor: `rgba(255,255,255,${opacity})`,
        },
      ]}
    />
  );
}

function Ring({
  size,
  left,
  top,
  stroke = 2,
  opacity = 0.04,
}: {
  size: number;
  left: number;
  top: number;
  stroke?: number;
  opacity?: number;
}) {
  return (
    <View
      style={[
        styles.abs,
        {
          width: size,
          height: size,
          left,
          top,
          borderRadius: size / 2,
          backgroundColor: "transparent",
          borderWidth: stroke,
          borderColor: `rgba(255,255,255,${opacity})`,
        },
      ]}
    />
  );
}

function Dots({
  left,
  top,
  rows = 3,
  cols = 4,
  gap = 10,
  size = 5,
  opacity = 0.04,
}: {
  left: number;
  top: number;
  rows?: number;
  cols?: number;
  gap?: number;
  size?: number;
  opacity?: number;
}) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <View
          key={`${r}-${c}`}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: `rgba(255,255,255,${opacity})`,
            marginRight: c === cols - 1 ? 0 : gap,
            marginBottom: r === rows - 1 ? 0 : gap,
          }}
        />
      );
    }
  }
  return (
    <View style={[styles.abs, { left, top }]}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: cols * size + (cols - 1) * gap,
        }}
      >
        {dots}
      </View>
    </View>
  );
}

// Concentric corner rings (like arcs in top-left)
function CornerRings({
  corner = "tl", // "tl" | "tr" | "bl" | "br"
  radius = W * 1.05,
  rings = 4,
  gap = 40,
  stroke = 2,
  baseOpacity = 0.09,
  fade = 0.02,
}: {
  corner?: "tl" | "tr" | "bl" | "br";
  radius?: number;
  rings?: number;
  gap?: number;
  stroke?: number;
  baseOpacity?: number;
  fade?: number;
}) {
  let cx = 0,
    cy = 0;
  const offset = 0.22; // push center outwards

  switch (corner) {
    case "tl":
      cx = -W * offset;
      cy = -W * offset;
      break;
    case "tr":
      cx = W + W * offset;
      cy = -W * offset;
      break;
    case "bl":
      cx = -W * offset;
      cy = H + W * offset;
      break;
    case "br":
      cx = W + W * offset;
      cy = H + W * offset;
      break;
  }

  const ringViews = [];
  for (let i = 0; i < rings; i++) {
    const size = radius + i * gap;
    const opacity = Math.max(0, baseOpacity - i * fade);

    ringViews.push(
      <View
        key={i}
        style={[
          styles.abs,
          {
            width: size,
            height: size,
            left: cx - size / 2,
            top: cy - size / 2,
            borderRadius: size / 2,
            backgroundColor: "transparent",
            borderWidth: stroke,
            borderColor: `rgba(255,255,255,${opacity})`,
          },
        ]}
      />
    );
  }

  return <>{ringViews}</>;
}

// === Main component ===
export default function DecorativeShapes() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* Large soft circles */}
      {/* <Circle size={W * 0.75} left={-W * 0.2} top={H * 0.06} opacity={0.04} /> */}
      <Circle size={W * 0.95} left={W * 0.55} top={H * 0.18} opacity={0.04} />
      <Circle size={W * 0.85} left={-W * 0.25} top={H * 0.70} opacity={0.04} />

      {/* Mid accent circles */}
      {/* <Circle size={W * 0.32} left={W * 0.08} top={H * 0.11} opacity={0.04} /> */}
      {/* <Circle size={W * 0.28} left={W * 0.64} top={H * 0.08} opacity={0.04} /> */}

      {/* Concentric arcs in top-left */}
      <CornerRings
        corner="tl"
        radius={W * 1.05}
        rings={2}
        gap={100}
        stroke={30}
        baseOpacity={0.07}
        fade={0.02}
      />

      {/* Optional dotted cluster */}
      {/* <Dots left={W * 0.70} top={H * 0.62} rows={3} cols={4} gap={12} size={5} opacity={0.06} /> */}

      {/* Small accents near bottom */}
      {/* <Circle size={W * 0.18} left={W * 0.22} top={H * 0.74} opacity={0.04} /> */}
      <Circle size={W * 0.14} left={W * 0.06} top={H * 0.58} opacity={0.04} />
    </View>
  );
}

const styles = StyleSheet.create({
  abs: {
    position: "absolute",
  },
});