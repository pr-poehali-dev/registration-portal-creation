import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Participant } from './types';

interface ParticipantsTabProps {
  participants: Participant[];
  newParticipant: { name: string; team: string; category: string };
  nextNumber: number;
  onNewParticipantChange: (field: string, value: string) => void;
  onAddParticipant: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export const ParticipantsTab = ({
  participants,
  newParticipant,
  nextNumber,
  onNewParticipantChange,
  onAddParticipant,
  getStatusColor,
  getStatusText,
}: ParticipantsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="UserPlus" className="w-5 h-5 text-primary" />
            Регистрация участника
          </CardTitle>
          <CardDescription>Добавьте нового участника с автоматическим присвоением номера</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ФИО участника</Label>
              <Input 
                id="name" 
                placeholder="Иван Иванов"
                value={newParticipant.name}
                onChange={(e) => onNewParticipantChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team">Команда</Label>
              <Input 
                id="team" 
                placeholder="Название команды"
                value={newParticipant.team}
                onChange={(e) => onNewParticipantChange('team', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select value={newParticipant.category} onValueChange={(value) => onNewParticipantChange('category', value)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Юниоры">Юниоры</SelectItem>
                  <SelectItem value="Взрослые">Взрослые</SelectItem>
                  <SelectItem value="Ветераны">Ветераны</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={onAddParticipant} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
            <Icon name="Info" className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-900">Следующий свободный номер: <strong>{nextNumber}</strong></span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" className="w-5 h-5 text-secondary" />
            Список участников
          </CardTitle>
          <CardDescription>Всего зарегистрировано: {participants.length} человек</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>ФИО</TableHead>
                <TableHead>Команда</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((p) => (
                <TableRow key={p.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Badge variant="outline" className="font-mono font-bold text-base">{p.number}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.team}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(p.status)} text-white`}>
                      {getStatusText(p.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
