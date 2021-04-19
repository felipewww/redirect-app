import {
    ISubjects,
    Stages,
    StagesInitials,
    StagesNames,
    SubjectsInitials,
    SubjectsNames
} from "@Domain/types";
import {INameMapped} from "@Domain/utils/AbilityParser/types";
import {InvalidStageError, InvalidSubjectError} from "@Domain/utils/AbilityParser/errors";

export default class AbilityParser {
    private abilityStr: string;

    private stage: INameMapped<StagesNames, StagesInitials> = {
        name: null,
        initials: null
    };

    private subject: INameMapped<SubjectsNames, SubjectsInitials> = {
        name: null,
        initials: null
    }

    private year: string;

    private uri: string;

    public parse(abilityStr: string) {
        this.abilityStr = abilityStr;
        this.setStage();
        this.setYear();
        this.setSubject();
        this.mountUri()

        return this
    }

    public getUri() {
        return this.uri;
    }

    private setStage() {
        this.stage.initials = <StagesInitials>this.abilityStr.slice(0,2)

        const stages: Stages = {
            'EF': 'fundamental',
            'EI': 'infantil',
        }

        this.stage.name = stages[this.stage.initials];

        if (!this.stage.name) {
            throw new InvalidStageError(this.stage.initials)
        }
    }

    private setYear() {
        const yearExtracted: string = this.abilityStr.slice(2,4)

        if (this.stage.initials === 'EI') {
            if (yearExtracted === '02') {
                this.year = 'creche'
            } else {
                this.year = 'pre-escola'
            }

            return;
        }

        this.year = yearExtracted.replace('0', '').concat('ano');
    }

    private setSubject() {
        this.subject.initials = <SubjectsInitials>this.abilityStr.slice(4,6);

        const subjects: ISubjects = {
            LP: 'lingua-portuguesa',
            GE: 'geografia',
            CI: 'ciencias',
            LI: 'lingua-inglesa',
            HI: 'historia',
            MA: 'matematica',
        }

        this.subject.name = subjects[this.subject.initials]

        if (!this.subject.name) {
            throw new InvalidSubjectError(this.subject.initials)
        }
    }

    private mountUri() {
        const inSequence: Array<string> = [
            this.stage.name,
            this.year
        ];

        if (this.stage.initials === 'EF') {
            inSequence.push(this.subject.name)
        }

        inSequence.push('habilidade')

        inSequence.push(this.abilityStr)

        const uri = inSequence.join('/')

        this.uri = '/' + uri;
    }
}
