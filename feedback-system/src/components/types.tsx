export type sClass = {
  CLASS: string;
  DEPARTMENT: string;
  TEACHERS: number[];
};
export type classes = sClass[];
export type teacher = {
  RESULT: number;
  url: string;
  NAME: string;
  DEPARTMENT: string;
  T_ID: number;
  QUALIFICATION: string;
  EXPERIENCE: string;
  AWARDS: string;
};
export type qstns = string[];
export type students = {
  class: string;
  email: string;
  name: string;
  rollno: string;
  votes: [];
};
export type singleClass = {
  CLASS?: string;
  DEPARTMENT?: string;
  TEACHERS?: number[];
};
export type classData = [singleClass];

export type votes = {
  id: number;
  q0: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
};
