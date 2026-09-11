export type ChallengeStatus = "DRAFT" | "SCHEDULED" | "WAITING" | "RUNNING" | "FINISHED";
export type Challenge = { id:string; creator_id:string; title:string; description:string; category:string; scheduled_at:string; max_participants:number; question_duration_seconds:number; question_count:number; status:ChallengeStatus };
export type AuthSession = { access_token:string; refresh_token:string; token_type:string; user:{id:string; email:string; username:string} };
export type Question = { id:string; text:string; type:"QCM"|"TRUE_FALSE"|"TEXT"; points:number; display_order:number; options:{id:string;text:string}[] };
export type Participant = {id:string;user_id:string;score:number;status:"ACTIVE"|"ELIMINATED"|"FINISHED";joined_at:string};
export type Statistics = {games_played:number;wins:number;finals_reached:number;best_score:number;success_rate:number};
export type HistoryItem = {id:string;challenge_id:string;final_score:number;final_rank:number;correct_answers:number;incorrect_answers:number;played_at:string};
const base = process.env.NEXT_PUBLIC_API_BASE_URL;
export const wsBase = process.env.NEXT_PUBLIC_WS_BASE_URL;
function endpoint(path:string) { if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL est requis."); return `${base.replace(/\/$/, "")}${path}`; }
export async function api<T>(path:string, init:RequestInit = {}, token?:string):Promise<T> {
 const response = await fetch(endpoint(path), { ...init, headers:{ "Content-Type":"application/json", ...init.headers, ...(token ? {Authorization:`Bearer ${token}`} : {}) }, cache:"no-store" });
 if (!response.ok) { const data = await response.json().catch(()=>null); throw new Error(data?.detail || "Une erreur réseau est survenue."); }
 return response.status === 204 ? undefined as T : response.json() as Promise<T>;
}
export const token = () => typeof window === "undefined" ? undefined : sessionStorage.getItem("mada_access_token") || undefined;
export const authApi = { login:(email:string,password:string)=>api<AuthSession>("/auth/login",{method:"POST",body:JSON.stringify({email,password})}), register:(email:string,username:string,password:string)=>api<AuthSession>("/auth/register",{method:"POST",body:JSON.stringify({email,username,password})}), me:(t=token())=>api<AuthSession["user"]>("/auth/me",{},t) };
export const challengeApi = {
 list:()=>api<Challenge[]>("/challenges"), get:(id:string)=>api<Challenge>(`/challenges/${id}`),
 create:(data:Omit<Challenge,"id"|"creator_id"|"status">,t=token())=>api<Challenge>("/challenges",{method:"POST",body:JSON.stringify(data)},t),
 addQuestion:(id:string,data:{text:string;type:"QCM"|"TRUE_FALSE"|"TEXT";points:number;display_order:number;options:{text:string;is_correct:boolean}[];correct_text_answer?:string},t=token())=>api<Question>(`/challenges/${id}/questions`,{method:"POST",body:JSON.stringify(data)},t),
 schedule:(id:string,t=token())=>api<Challenge>(`/challenges/${id}/schedule`,{method:"POST"},t), join:(id:string,t=token())=>api<Participant>(`/challenges/${id}/join`,{method:"POST"},t),
 leaderboard:(id:string)=>api<{rank:number;username:string;score:number;participant_id:string}[]>(`/challenges/${id}/leaderboard`),
 answer:(id:string,data:{selected_option_id?:string;text_answer?:string;response_time_ms:number},t=token())=>api<{is_correct:boolean;points_awarded:number}>(`/challenges/${id}/answers`,{method:"POST",body:JSON.stringify(data)},t)
};
export const userApi={statistics:(t=token())=>api<Statistics>("/users/me/statistics",{},t),history:(t=token())=>api<HistoryItem[]>("/users/me/history",{},t)};
