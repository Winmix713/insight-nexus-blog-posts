
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface TeamSelectorProps {
  selectedTeam: string;
  onSelectTeam: (team: string) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ selectedTeam, onSelectTeam }) => {
  return (
    <Select value={selectedTeam} onValueChange={onSelectTeam}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select team" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Liverpool">Liverpool</SelectItem>
        <SelectItem value="Man City">Man City</SelectItem>
        <SelectItem value="Arsenal">Arsenal</SelectItem>
        <SelectItem value="Chelsea">Chelsea</SelectItem>
        <SelectItem value="Tottenham">Tottenham</SelectItem>
        <SelectItem value="Man United">Man United</SelectItem>
      </SelectContent>
    </Select>
  );
};
