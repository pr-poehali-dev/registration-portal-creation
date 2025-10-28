import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Participant {
  id: string;
  number: number;
  name: string;
  team: string;
  category: string;
  status: 'registered' | 'ready' | 'completed';
}

interface Result {
  participantId: string;
  participantName: string;
  participantNumber: number;
  team: string;
  score: number;
  place: number;
  category: string;
}

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', number: 101, name: 'Алексей Иванов', team: 'Спартак', category: 'Юниоры', status: 'completed' },
    { id: '2', number: 102, name: 'Мария Петрова', team: 'Динамо', category: 'Юниоры', status: 'ready' },
    { id: '3', number: 103, name: 'Дмитрий Сидоров', team: 'Спартак', category: 'Взрослые', status: 'registered' },
  ]);

  const [results, setResults] = useState<Result[]>([
    { participantId: '1', participantName: 'Алексей Иванов', participantNumber: 101, team: 'Спартак', score: 95.5, place: 1, category: 'Юниоры' },
    { participantId: '2', participantName: 'Мария Петрова', participantNumber: 102, team: 'Динамо', score: 89.2, place: 2, category: 'Юниоры' },
  ]);

  const [newParticipant, setNewParticipant] = useState({ name: '', team: '', category: 'Юниоры' });
  const [nextNumber, setNextNumber] = useState(104);

  const stats = {
    total: participants.length,
    teams: [...new Set(participants.map(p => p.team))].length,
    completed: participants.filter(p => p.status === 'completed').length,
    judges: 8,
  };

  const teamStandings = () => {
    const teamScores: Record<string, number> = {};
    results.forEach(r => {
      teamScores[r.team] = (teamScores[r.team] || 0) + r.score;
    });
    return Object.entries(teamScores)
      .sort(([, a], [, b]) => b - a)
      .map(([team, score], index) => ({ team, score, place: index + 1 }));
  };

  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.team) {
      toast.error('Заполните все поля');
      return;
    }
    
    const participant: Participant = {
      id: String(Date.now()),
      number: nextNumber,
      name: newParticipant.name,
      team: newParticipant.team,
      category: newParticipant.category,
      status: 'registered',
    };
    
    setParticipants([...participants, participant]);
    setNextNumber(nextNumber + 1);
    setNewParticipant({ name: '', team: '', category: 'Юниоры' });
    toast.success(`Участник ${participant.name} зарегистрирован с номером ${participant.number}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'ready': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершил';
      case 'ready': return 'Готов';
      default: return 'Зарегистрирован';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Trophy" className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Система управления соревнованиями
              </h1>
              <p className="text-muted-foreground mt-1">Регистрация, результаты и управление</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Users" className="w-4 h-4" />
                Участников
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Flag" className="w-4 h-4" />
                Команд
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{stats.teams}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="CheckCircle" className="w-4 h-4" />
                Завершили
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="UserCheck" className="w-4 h-4" />
                Судей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.judges}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="participants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1">
            <TabsTrigger value="participants" className="flex items-center gap-2 py-3">
              <Icon name="UserPlus" className="w-4 h-4" />
              Регистрация
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2 py-3">
              <Icon name="BarChart3" className="w-4 h-4" />
              Результаты
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 py-3">
              <Icon name="FileText" className="w-4 h-4" />
              Документы
            </TabsTrigger>
            <TabsTrigger value="protocol" className="flex items-center gap-2 py-3">
              <Icon name="Camera" className="w-4 h-4" />
              Протоколы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-6 animate-fade-in">
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
                      onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team">Команда</Label>
                    <Input 
                      id="team" 
                      placeholder="Название команды"
                      value={newParticipant.team}
                      onChange={(e) => setNewParticipant({...newParticipant, team: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select value={newParticipant.category} onValueChange={(value) => setNewParticipant({...newParticipant, category: value})}>
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
                    <Button onClick={handleAddParticipant} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Medal" className="w-5 h-5 text-primary" />
                    Личный зачёт
                  </CardTitle>
                  <CardDescription>Результаты участников по очкам</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Место</TableHead>
                        <TableHead>№</TableHead>
                        <TableHead>Участник</TableHead>
                        <TableHead>Очки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((r) => (
                        <TableRow key={r.participantId}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {r.place === 1 && <Icon name="Trophy" className="w-5 h-5 text-yellow-500" />}
                              {r.place === 2 && <Icon name="Trophy" className="w-5 h-5 text-gray-400" />}
                              {r.place === 3 && <Icon name="Trophy" className="w-5 h-5 text-orange-600" />}
                              <span className="font-bold text-lg">{r.place}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">{r.participantNumber}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{r.participantName}</TableCell>
                          <TableCell>
                            <Badge className="bg-gradient-to-r from-primary to-secondary text-white font-bold">
                              {r.score}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Flag" className="w-5 h-5 text-secondary" />
                    Командный зачёт
                  </CardTitle>
                  <CardDescription>Суммарные результаты команд</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Место</TableHead>
                        <TableHead>Команда</TableHead>
                        <TableHead>Очки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamStandings().map((t) => (
                        <TableRow key={t.team}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {t.place === 1 && <Icon name="Trophy" className="w-5 h-5 text-yellow-500" />}
                              <span className="font-bold text-lg">{t.place}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{t.team}</TableCell>
                          <TableCell>
                            <Badge className="bg-gradient-to-r from-secondary to-accent text-white font-bold">
                              {t.score.toFixed(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Download" className="w-5 h-5 text-accent" />
                  Отчёты и протоколы
                </CardTitle>
                <CardDescription>Генерация документов для главного судьи и инспектора</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5 hover:border-primary">
                    <Icon name="FileText" className="w-6 h-6 text-primary" />
                    <span>Протокол главного судьи</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-secondary/5 hover:border-secondary">
                    <Icon name="ClipboardCheck" className="w-6 h-6 text-secondary" />
                    <span>Отчёт инспектора</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-accent/5 hover:border-accent">
                    <Icon name="Award" className="w-6 h-6 text-accent" />
                    <span>Итоговая таблица</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" className="w-5 h-5 text-primary" />
                  База документов и материалов
                </CardTitle>
                <CardDescription>Инструктаж, справочные материалы и официальная документация</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="GraduationCap" className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Инструктаж участников</CardTitle>
                          <CardDescription>Правила, требования безопасности</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-secondary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Icon name="Scale" className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Регламент соревнований</CardTitle>
                          <CardDescription>Официальные правила и положения</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-accent transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon name="Users" className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Инструкции для судей</CardTitle>
                          <CardDescription>Методика оценивания, протоколы</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-2 hover:border-green-500 transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Icon name="HelpCircle" className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Справочные материалы</CardTitle>
                          <CardDescription>FAQ, контакты, расписание</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="protocol" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ScanLine" className="w-5 h-5 text-primary" />
                  Загрузка и распознавание протоколов
                </CardTitle>
                <CardDescription>Автоматическое распознавание данных с фото протоколов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Icon name="Upload" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Загрузите фото протокола</h3>
                  <p className="text-muted-foreground mb-4">Перетащите файл или нажмите для выбора</p>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Camera" className="w-4 h-4 mr-2" />
                    Выбрать файл
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Советы для лучшего распознавания</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Убедитесь, что фото чёткое и хорошо освещено</li>
                        <li>• Протокол должен быть полностью виден в кадре</li>
                        <li>• Избегайте бликов и теней на документе</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;