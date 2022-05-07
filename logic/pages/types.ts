export type pageState = {
    page: "Lessons"| "Results" | "Profile" | "Chat"|"Login"
}

export type pageAction = {
    type: "CHANGE PAGE"
    payload: pageState
}
