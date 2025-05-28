
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIModelSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const AI_MODELS = [
  "GPT-4",
  "GPT-4 Turbo",
  "GPT-3.5 Turbo",
  "Claude 3 Opus",
  "Claude 3 Sonnet",
  "Claude 3 Haiku",
  "Gemini Pro",
  "Gemini Ultra",
  "PaLM 2",
  "Llama 2"
];

export const AIModelSelect = ({ value, onValueChange }: AIModelSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black">
        <SelectValue placeholder="Select AI model..." />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
        {AI_MODELS.map((model) => (
          <SelectItem 
            key={model} 
            value={model}
            className="hover:bg-gray-100 focus:bg-gray-100"
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
