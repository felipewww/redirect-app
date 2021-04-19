export class InvalidStageError extends Error {
    constructor(stageInitials: string) {
        super();
        this.message = `Stage initials "${stageInitials}" are invalid`
    }
}

export class InvalidSubjectError extends Error {
    constructor(subjectInitials: string) {
        super();
        this.message = `Subject initials "${subjectInitials}" are invalid`
    }
}
