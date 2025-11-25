import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GradingCriteria = () => {
  const data = [
    { score: 81, main: "Chief", sub: "C 1", grade: 1 },
    { score: 78, main: "Chief", sub: "C 2", grade: 2 },
    { score: 75, main: "Chief", sub: "C 3", grade: 3 },
    { score: 72, main: "GM", sub: "G 1", grade: 4 },
    { score: 69, main: "GM", sub: "G 2", grade: 5 },
    { score: 66, main: "GM", sub: "G 3", grade: 6 },
    { score: 63, main: "Director", sub: "D 1", grade: 7 },
    { score: 60, main: "Director", sub: "D 2", grade: 8 },
    { score: 57, main: "Director", sub: "D 3", grade: 9 },
    { score: 54, main: "Head", sub: "H 1", grade: 10 },
    { score: 51, main: "Head", sub: "H 2", grade: 11 },
    { score: 48, main: "Head", sub: "H 3", grade: 12 },
    { score: 45, main: "Manager", sub: "M 1", grade: 13 },
    { score: 42, main: "Manager", sub: "M 2", grade: 14 },
    { score: 39, main: "Manager", sub: "M 3", grade: 15 },
    { score: 36, main: "Team Leader", sub: "T 1", grade: 16 },
    { score: 33, main: "Team Leader", sub: "T 2", grade: 17 },
    { score: 30, main: "Team Leader", sub: "T 3", grade: 18 },
    { score: 27, main: "Specialist", sub: "S 1", grade: 19 },
    { score: 24, main: "Specialist", sub: "S 2", grade: 20 },
    { score: 21, main: "Specialist", sub: "S 3", grade: 21 },
    { score: 18, main: "Junior", sub: "J 1", grade: 22 },
    { score: 15, main: "Junior", sub: "J 2", grade: 23 },
    { score: 12, main: "Junior", sub: "J 3", grade: 24 },
    { score: 9, main: "Foreman", sub: "", grade: 25 },
    { score: 6, main: "Worker", sub: "", grade: 26 },
    { score: 3, main: "Labour", sub: "", grade: 27 },
  ];

  // Step 1: calculate rowSpan for main categories
  const rowSpanMap = {};
  data.forEach((row) => {
    rowSpanMap[row.main] = (rowSpanMap[row.main] || 0) + 1;
  });

  // Step 2: track which main categories are already rendered
  const renderedMain = {};

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Grading Criteria</h1>

      <div className="rounded-lg border shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Score</TableHead>
              <TableHead>Main Categories</TableHead>
              <TableHead>Sub Categories</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.score}</TableCell>
                {!renderedMain[row.main] ? (
                  <TableCell rowSpan={rowSpanMap[row.main]}>
                    {row.main}
                  </TableCell>
                ) : null}
                <TableCell>{row.sub}</TableCell>
                <TableCell>{row.grade}</TableCell>
                {renderedMain[row.main] = true}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GradingCriteria;
