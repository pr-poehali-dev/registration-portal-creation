import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Result, TeamStanding } from './types';

interface ResultsTabProps {
  results: Result[];
  teamStandings: TeamStanding[];
}

export const ResultsTab = ({ results, teamStandings }: ResultsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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
                {teamStandings.map((t) => (
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
    </div>
  );
};
