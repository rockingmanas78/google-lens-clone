import { TextInputProps } from "react-native";

export interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  onSubmit?: (query: string) => void;
  onLensPress?: () => void;
}