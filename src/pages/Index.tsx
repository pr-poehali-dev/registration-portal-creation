import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Participant {
  id: string;
  number: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthYear: number;
  gender: 'М' | 'Ж';
  team: string;
  category: string;
  disciplines: string[];
  status: 'registered' | 'briefed' | 'competing' | 'completed';
  instructed: boolean;
}

interface Judge {
  id: string;
  name: string;
  role: string;
  category: string;
  certification: string;
}

interface Result {
  participantId: string;
  participantNumber: number;
  participantName: string;
  team: string;
  category: string;
  discipline: string;
  result: number;
  units: string;
  place: number;
  points: number;
}

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      number: 101,
      lastName: 'Иванов',
      firstName: 'Алексей',
      middleName: 'Петрович',
      birthYear: 2008,
      gender: 'М',
      team: 'ДЮСШ №1',
      category: 'Юноши 16-17 лет',
      disciplines: ['Бег 100м', 'Подтягивание', 'Плавание 50м'],
      status: 'completed',
      instructed: true
    },
    {
      id: '2',
      number: 102,
      lastName: 'Петрова',
      firstName: 'Мария',
      middleName: 'Сергеевна',
      birthYear: 2009,
      gender: 'Ж',
      team: 'Спортивный клуб Олимп',
      category: 'Девушки 14-15 лет',
      disciplines: ['Бег 60м', 'Силовая гимнастика', 'Плавание 50м'],
      status: 'briefed',
      instructed: true
    },
    {
      id: '3',
      number: 103,
      lastName: 'Сидоров',
      firstName: 'Дмитрий',
      middleName: 'Александрович',
      birthYear: 1995,
      gender: 'М',
      team: 'ДЮСШ №1',
      category: 'Мужчины',
      disciplines: ['Бег 100м', 'Подтягивание', 'Плавание 100м'],
      status: 'registered',
      instructed: false
    }
  ]);

  const [judges, setJudges] = useState<Judge[]>([
    { id: '1', name: 'Козлов Иван Иванович', role: 'Главный судья', category: 'Всероссийская', certification: 'ВК-2024' },
    { id: '2', name: 'Морозова Елена Петровна', role: 'Главный секретарь', category: 'I категория', certification: '1К-2023' },
    { id: '3', name: 'Волков Сергей Дмитриевич', role: 'Судья на старте', category: 'II категория', certification: '2К-2023' },
    { id: '4', name: 'Новикова Ольга Васильевна', role: 'Судья на финише', category: 'II категория', certification: '2К-2024' }
  ]);

  const [results, setResults] = useState<Result[]>([
    { participantId: '1', participantNumber: 101, participantName: 'Иванов А.П.', team: 'ДЮСШ №1', category: 'Юноши 16-17 лет', discipline: 'Бег 100м', result: 13.2, units: 'сек', place: 1, points: 100 },
    { participantId: '1', participantNumber: 101, participantName: 'Иванов А.П.', team: 'ДЮСШ №1', category: 'Юноши 16-17 лет', discipline: 'Подтягивание', result: 18, units: 'раз', place: 1, points: 95 },
    { participantId: '2', participantNumber: 102, participantName: 'Петрова М.С.', team: 'СК Олимп', category: 'Девушки 14-15 лет', discipline: 'Бег 60м', result: 9.1, units: 'сек', place: 2, points: 89 }
  ]);

  const [newParticipant, setNewParticipant] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    birthYear: new Date().getFullYear() - 16,
    gender: 'М' as 'М' | 'Ж',
    team: '',
    category: 'Юноши 16-17 лет',
    disciplines: [] as string[]
  });

  const [nextNumber, setNextNumber] = useState(104);

  const categories = [
    'Мальчики 10-11 лет',
    'Девочки 10-11 лет',
    'Мальчики 12-13 лет',
    'Девочки 12-13 лет',
    'Юноши 14-15 лет',
    'Девушки 14-15 лет',
    'Юноши 16-17 лет',
    'Девушки 16-17 лет',
    'Юниоры 18-19 лет',
    'Юниорки 18-19 лет',
    'Мужчины',
    'Женщины'
  ];

  const disciplines = {
    'М': ['Бег 60м', 'Бег 100м', 'Бег 1000м', 'Бег 3000м', 'Подтягивание', 'Силовая гимнастика', 'Плавание 50м', 'Плавание 100м', 'Стрельба'],
    'Ж': ['Бег 60м', 'Бег 100м', 'Бег 500м', 'Бег 1000м', 'Силовая гимнастика', 'Плавание 50м', 'Плавание 100м', 'Стрельба']
  };

  const stats = {
    total: participants.length,
    teams: [...new Set(participants.map(p => p.team))].length,
    instructed: participants.filter(p => p.instructed).length,
    completed: participants.filter(p => p.status === 'completed').length,
    judges: judges.length
  };

  const handleAddParticipant = () => {
    if (!newParticipant.lastName || !newParticipant.firstName || !newParticipant.team || newParticipant.disciplines.length === 0) {
      toast.error('Заполните все обязательные поля и выберите хотя бы одну дисциплину');
      return;
    }

    const participant: Participant = {
      id: String(Date.now()),
      number: nextNumber,
      lastName: newParticipant.lastName,
      firstName: newParticipant.firstName,
      middleName: newParticipant.middleName,
      birthYear: newParticipant.birthYear,
      gender: newParticipant.gender,
      team: newParticipant.team,
      category: newParticipant.category,
      disciplines: newParticipant.disciplines,
      status: 'registered',
      instructed: false
    };

    setParticipants([...participants, participant]);
    setNextNumber(nextNumber + 1);
    setNewParticipant({
      lastName: '',
      firstName: '',
      middleName: '',
      birthYear: new Date().getFullYear() - 16,
      gender: 'М',
      team: '',
      category: 'Юноши 16-17 лет',
      disciplines: []
    });
    toast.success(`Участник ${participant.lastName} ${participant.firstName} зарегистрирован с номером ${participant.number}`);
  };

  const toggleDiscipline = (discipline: string) => {
    setNewParticipant(prev => ({
      ...prev,
      disciplines: prev.disciplines.includes(discipline)
        ? prev.disciplines.filter(d => d !== discipline)
        : [...prev.disciplines, discipline]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'competing': return 'bg-blue-600';
      case 'briefed': return 'bg-yellow-600';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершил';
      case 'competing': return 'На старте';
      case 'briefed': return 'Проинструктирован';
      default: return 'Зарегистрирован';
    }
  };

  const teamStandings = () => {
    const teamScores: Record<string, number> = {};
    results.forEach(r => {
      teamScores[r.team] = (teamScores[r.team] || 0) + r.points;
    });
    return Object.entries(teamScores)
      .sort(([, a], [, b]) => b - a)
      .map(([team, points], index) => ({ team, points, place: index + 1 }));
  };

  const personalStandings = () => {
    const participantScores: Record<string, { name: string; team: string; category: string; totalPoints: number; number: number }> = {};
    
    results.forEach(r => {
      if (!participantScores[r.participantId]) {
        participantScores[r.participantId] = {
          name: r.participantName,
          team: r.team,
          category: r.category,
          totalPoints: 0,
          number: r.participantNumber
        };
      }
      participantScores[r.participantId].totalPoints += r.points;
    });

    return Object.entries(participantScores)
      .sort(([, a], [, b]) => b.totalPoints - a.totalPoints)
      .map(([id, data], index) => ({ id, ...data, place: index + 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Trophy" className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Система управления соревнованиями по полиатлону
                </h1>
                <p className="text-muted-foreground mt-1">Регламент МСП от 28.10.2016</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="FileText" className="w-4 h-4" />
              Правила МСП
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 animate-slide-up">
          <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Users" className="w-3.5 h-3.5" />
                Участников
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Flag" className="w-3.5 h-3.5" />
                Команд
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.teams}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="ClipboardCheck" className="w-3.5 h-3.5" />
                Инструктаж
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.instructed}/{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="CheckCircle" className="w-3.5 h-3.5" />
                Завершили
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="UserCheck" className="w-3.5 h-3.5" />
                Судей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.judges}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="participants" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 h-auto p-1">
            <TabsTrigger value="participants" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="UserPlus" className="w-3.5 h-3.5" />
              Регистрация
            </TabsTrigger>
            <TabsTrigger value="judges" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="Shield" className="w-3.5 h-3.5" />
              Судейство
            </TabsTrigger>
            <TabsTrigger value="briefing" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="GraduationCap" className="w-3.5 h-3.5" />
              Инструктаж
            </TabsTrigger>
            <TabsTrigger value="competition" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="Timer" className="w-3.5 h-3.5" />
              Соревнование
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="BarChart3" className="w-3.5 h-3.5" />
              Результаты
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1.5 py-2.5 text-xs">
              <Icon name="FileText" className="w-3.5 h-3.5" />
              Отчёты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="UserPlus" className="w-5 h-5 text-primary" />
                  Регистрация участника
                </CardTitle>
                <CardDescription>Заполните данные участника согласно регламенту МСП</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      placeholder="Иванов"
                      value={newParticipant.lastName}
                      onChange={(e) => setNewParticipant({...newParticipant, lastName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      placeholder="Алексей"
                      value={newParticipant.firstName}
                      onChange={(e) => setNewParticipant({...newParticipant, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="middleName">Отчество</Label>
                    <Input
                      id="middleName"
                      placeholder="Петрович"
                      value={newParticipant.middleName}
                      onChange={(e) => setNewParticipant({...newParticipant, middleName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="birthYear">Год рождения *</Label>
                    <Input
                      id="birthYear"
                      type="number"
                      value={newParticipant.birthYear}
                      onChange={(e) => setNewParticipant({...newParticipant, birthYear: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gender">Пол *</Label>
                    <Select value={newParticipant.gender} onValueChange={(value: 'М' | 'Ж') => setNewParticipant({...newParticipant, gender: value, disciplines: []})}>
                      <SelectTrigger id="gender">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="М">Мужской</SelectItem>
                        <SelectItem value="Ж">Женский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="category">Категория *</Label>
                    <Select value={newParticipant.category} onValueChange={(value) => setNewParticipant({...newParticipant, category: value})}>
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="team">Команда *</Label>
                    <Input
                      id="team"
                      placeholder="Название команды"
                      value={newParticipant.team}
                      onChange={(e) => setNewParticipant({...newParticipant, team: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Дисциплины полиатлона *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-muted/50 rounded-lg">
                    {disciplines[newParticipant.gender].map(discipline => (
                      <div key={discipline} className="flex items-center space-x-2">
                        <Checkbox
                          id={`discipline-${discipline}`}
                          checked={newParticipant.disciplines.includes(discipline)}
                          onCheckedChange={() => toggleDiscipline(discipline)}
                        />
                        <Label
                          htmlFor={`discipline-${discipline}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {discipline}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button onClick={handleAddParticipant} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Зарегистрировать участника
                  </Button>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <Icon name="Hash" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-900">Следующий номер: <strong>{nextNumber}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Users" className="w-5 h-5 text-secondary" />
                  Список участников
                </CardTitle>
                <CardDescription>Зарегистрировано: {participants.length} чел.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">№</TableHead>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Год</TableHead>
                        <TableHead>Команда</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Дисциплины</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((p) => (
                        <TableRow key={p.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Badge variant="outline" className="font-mono font-bold">{p.number}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {p.lastName} {p.firstName} {p.middleName}
                          </TableCell>
                          <TableCell>{p.birthYear}</TableCell>
                          <TableCell>{p.team}</TableCell>
                          <TableCell className="text-xs">{p.category}</TableCell>
                          <TableCell className="text-xs">{p.disciplines.length} дисц.</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(p.status)} text-white text-xs`}>
                              {getStatusText(p.status)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="judges" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Shield" className="w-5 h-5 text-primary" />
                  Судейская коллегия
                </CardTitle>
                <CardDescription>Состав судейской коллегии соревнований</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО судьи</TableHead>
                        <TableHead>Должность</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Аттестация</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {judges.map((j) => (
                        <TableRow key={j.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{j.name}</TableCell>
                          <TableCell>
                            <Badge variant={j.role.includes('Главный') ? 'default' : 'secondary'}>
                              {j.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{j.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{j.certification}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Gavel" className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Главная судейская коллегия</CardTitle>
                      <CardDescription className="text-xs">Организация и контроль</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Timer" className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Судьи на дистанции</CardTitle>
                      <CardDescription className="text-xs">Фиксация результатов</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileCheck" className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Секретариат</CardTitle>
                      <CardDescription className="text-xs">Обработка протоколов</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="briefing" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="ClipboardCheck" className="w-5 h-5 text-yellow-600" />
                  Инструктаж участников
                </CardTitle>
                <CardDescription>Обязательный инструктаж по технике безопасности и правилам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertCircle" className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-900">Обязательные пункты инструктажа:</h4>
                      <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                        <li>Правила техники безопасности при выполнении упражнений</li>
                        <li>Порядок выполнения дисциплин полиатлона</li>
                        <li>Критерии оценивания и зачёта результатов</li>
                        <li>Права и обязанности участников</li>
                        <li>Процедура подачи апелляций</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">Загрузка бланков инструктажа</CardTitle>
                      <CardDescription className="text-xs">Отсканированные подписанные бланки</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Icon name="Upload" className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-3">Перетащите файлы или нажмите для выбора</p>
                        <Button size="sm" variant="outline">
                          <Icon name="File" className="w-3.5 h-3.5 mr-2" />
                          Выбрать файлы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">Статус инструктажа</CardTitle>
                      <CardDescription className="text-xs">Проинструктировано: {stats.instructed} из {stats.total}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon name="CheckCircle" className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-900">Проинструктировано</span>
                          </div>
                          <Badge className="bg-green-600">{stats.instructed}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" className="w-5 h-5 text-orange-600" />
                            <span className="font-medium text-orange-900">Ожидают</span>
                          </div>
                          <Badge className="bg-orange-600">{stats.total - stats.instructed}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competition" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Camera" className="w-5 h-5 text-primary" />
                  Распознавание протоколов
                </CardTitle>
                <CardDescription>Автоматическое распознавание результатов с фото протоколов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Icon name="Camera" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Загрузите фото протокола</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Система автоматически распознает номера участников и результаты</p>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Upload" className="w-4 h-4 mr-2" />
                    Загрузить протокол
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Требования к фото протоколов:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Чёткое изображение без размытия</li>
                        <li>• Хорошее освещение, без бликов</li>
                        <li>• Протокол целиком в кадре</li>
                        <li>• Разборчивый почерк или печатный текст</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Medal" className="w-5 h-5 text-primary" />
                    Личный зачёт
                  </CardTitle>
                  <CardDescription>Итоговые результаты участников</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
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
                        {personalStandings().slice(0, 10).map((p) => (
                          <TableRow key={p.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {p.place === 1 && <Icon name="Trophy" className="w-5 h-5 text-yellow-500" />}
                                {p.place === 2 && <Icon name="Trophy" className="w-5 h-5 text-gray-400" />}
                                {p.place === 3 && <Icon name="Trophy" className="w-5 h-5 text-orange-600" />}
                                <span className="font-bold">{p.place}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">{p.number}</Badge>
                            </TableCell>
                            <TableCell className="font-medium text-sm">{p.name}</TableCell>
                            <TableCell>
                              <Badge className="bg-gradient-to-r from-primary to-secondary text-white font-bold">
                                {p.totalPoints}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Flag" className="w-5 h-5 text-secondary" />
                    Командный зачёт
                  </CardTitle>
                  <CardDescription>Суммарные результаты команд</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
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
                                {t.place === 2 && <Icon name="Trophy" className="w-5 h-5 text-gray-400" />}
                                {t.place === 3 && <Icon name="Trophy" className="w-5 h-5 text-orange-600" />}
                                <span className="font-bold">{t.place}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{t.team}</TableCell>
                            <TableCell>
                              <Badge className="bg-gradient-to-r from-secondary to-accent text-white font-bold">
                                {t.points}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="ListChecks" className="w-5 h-5 text-accent" />
                  Результаты по дисциплинам
                </CardTitle>
                <CardDescription>Детальные результаты выступлений</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>№</TableHead>
                        <TableHead>Участник</TableHead>
                        <TableHead>Дисциплина</TableHead>
                        <TableHead>Результат</TableHead>
                        <TableHead>Место</TableHead>
                        <TableHead>Очки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((r, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">{r.participantNumber}</Badge>
                          </TableCell>
                          <TableCell className="font-medium text-sm">{r.participantName}</TableCell>
                          <TableCell className="text-sm">{r.discipline}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{r.result} {r.units}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{r.place}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-primary text-white">{r.points}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="FileText" className="w-5 h-5 text-primary" />
                  Генерация официальных документов
                </CardTitle>
                <CardDescription>Отчёты и протоколы согласно регламенту МСП</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-primary/5 hover:border-primary">
                    <Icon name="Gavel" className="w-8 h-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">Отчёт главного судьи</div>
                      <div className="text-xs text-muted-foreground">Итоговый отчёт соревнований</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-secondary/5 hover:border-secondary">
                    <Icon name="FileCheck" className="w-8 h-8 text-secondary" />
                    <div className="text-center">
                      <div className="font-semibold">Протокол инспектора</div>
                      <div className="text-xs text-muted-foreground">Проверка проведения</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-accent/5 hover:border-accent">
                    <Icon name="Award" className="w-8 h-8 text-accent" />
                    <div className="text-center">
                      <div className="font-semibold">Итоговая таблица</div>
                      <div className="text-xs text-muted-foreground">Личный и командный зачёт</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-green-600/5 hover:border-green-600">
                    <Icon name="ClipboardList" className="w-8 h-8 text-green-600" />
                    <div className="text-center">
                      <div className="font-semibold">Протоколы по дисциплинам</div>
                      <div className="text-xs text-muted-foreground">Детальные результаты</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-blue-600/5 hover:border-blue-600">
                    <Icon name="Users" className="w-8 h-8 text-blue-600" />
                    <div className="text-center">
                      <div className="font-semibold">Список участников</div>
                      <div className="text-xs text-muted-foreground">Реестр с номерами</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-purple-600/5 hover:border-purple-600">
                    <Icon name="Shield" className="w-8 h-8 text-purple-600" />
                    <div className="text-center">
                      <div className="font-semibold">Состав судей</div>
                      <div className="text-xs text-muted-foreground">Судейская коллегия</div>
                    </div>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle" className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">Все документы соответствуют регламенту МСП</h4>
                      <p className="text-sm text-green-800">Автоматическая генерация по утверждённым формам от 28.10.2016</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="BookOpen" className="w-5 h-5 text-secondary" />
                  Справочные материалы
                </CardTitle>
                <CardDescription>Официальная документация и правила</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Правила МСП 2016</div>
                      <div className="text-xs text-muted-foreground">Официальный регламент</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calculator" className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Таблицы оценок</div>
                      <div className="text-xs text-muted-foreground">Нормативы по возрастам</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Scale" className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Положение о судействе</div>
                      <div className="text-xs text-muted-foreground">Требования к судьям</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Icon name="AlertTriangle" className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Техника безопасности</div>
                      <div className="text-xs text-muted-foreground">Инструкции для участников</div>
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
