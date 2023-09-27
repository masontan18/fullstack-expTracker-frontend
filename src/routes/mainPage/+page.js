import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getUserId } from "../../utils/auth.js"

export async function load({ fetch }) {
	const resp = await fetch(
		PUBLIC_BACKEND_BASE_URL + '/expenses/users/' + getUserId() 
	);
	const res = await resp.json();
	if (resp.ok) {
		return {
			expenses: res
		};
	} else {
		return {
			expenses: []
		};
	}
}