
export function FollowersFormat (followers: number) {
    return new Intl.NumberFormat("es-AR").format(followers);
}