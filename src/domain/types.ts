export type StagesInitials = 'EI'|'EF';
export type StagesNames = 'fundamental'|'infantil';
export type Stages = { [key in StagesInitials]: StagesNames }

export type SubjectsInitials = 'LP' |'GE' |'CI' |'LI' |'HI' |'MA';
export type SubjectsNames = 'lingua-portuguesa' |'geografia' |'ciencias' |'lingua-inglesa' |'historia' |'matematica'

export interface ISubjects {
    LP: 'lingua-portuguesa'
    GE: 'geografia'
    CI: 'ciencias'
    LI: 'lingua-inglesa'
    HI: 'historia'
    MA: 'matematica'
}
