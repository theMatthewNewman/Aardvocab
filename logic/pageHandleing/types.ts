export type pageState = {
    page: "Grammar"| "Results" | "Vocabulary" | "Spelling" | "Profile" | "Testing"
}

export type pageAction = {
    type: "CHANGE PAGE"
    payload: pageState
}
