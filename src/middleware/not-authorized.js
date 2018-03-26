export async function notAuthorized(ctx, next) {
    if (!ctx.request.header.authorization)
        ctx.status = 401;
    else
        await next();
}