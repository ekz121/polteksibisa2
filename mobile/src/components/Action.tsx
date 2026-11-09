import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';

type Props = Omit<PressableProps, 'style' | 'children'> & { children: ReactNode; style?: StyleProp<ViewStyle>; focusColor?: string };

export function Action({ children, style, onFocus, onBlur, focusColor = colors.focus, accessibilityRole = 'button', ...props }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable {...props} accessibilityRole={accessibilityRole}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event); }}
      style={({ pressed }) => [styles.base, style, pressed && styles.pressed, focused && { borderColor: focusColor }]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minWidth: 48, minHeight: 48, borderWidth: 2, borderColor: 'transparent' },
  pressed: { opacity: 0.72 },
});
