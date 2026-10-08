import { redirect } from '@sveltejs/kit';

export function GET() {
	redirect(302, '/Oleg_Polin_Resume.pdf');
}
