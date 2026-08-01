export default {
    async fetch(
        request,
        env
    ) {
        const url =
            new URL(
                request.url
            );


        if (
            request.method ===
            "OPTIONS"
        ) {
            return new Response(
                null,
                {
                    status: 204,

                    headers:
                        corsHeaders(
                            env
                        )
                }
            );
        }


        if (
            request.method ===
            "GET" &&
            url.pathname ===
            "/"
        ) {
            return jsonResponse(
                {
                    ok: true,

                    service:
                        "UrbanWatch Intelligence Worker",

                    version:
                        "3.4",

                    message:
                        "Worker ativo."
                },
                200,
                env
            );
        }


        if (
            request.method ===
            "POST" &&
            url.pathname ===
            "/lead"
        ) {
            try {
                const lead =
                    await request.json();

                validateLead(
                    lead
                );

                /*
                 * A integração de e-mail será adicionada
                 * depois da configuração do provedor.
                 *
                 * Por enquanto, o Worker recebe,
                 * valida e registra o lead nos logs.
                 */

                console.log(
                    JSON.stringify(
                        {
                            type:
                                "lead.received",

                            lead
                        }
                    )
                );

                return jsonResponse(
                    {
                        ok: true,

                        code:
                            lead.code,

                        message:
                            "Lead recebido com sucesso."
                    },
                    200,
                    env
                );

            } catch (error) {
                return jsonResponse(
                    {
                        ok: false,

                        error:
                            error.message ||
                            "Requisição inválida."
                    },
                    400,
                    env
                );
            }
        }


        return jsonResponse(
            {
                ok: false,

                error:
                    "Rota não encontrada."
            },
            404,
            env
        );
    }
};


function validateLead(
    lead
) {
    const requiredFields = [
        "code",
        "source",
        "category",
        "campaign",
        "consultant",
        "vehicleType"
    ];


    for (
        const field of
        requiredFields
    ) {
        if (
            !lead?.[field]
        ) {
            throw new Error(
                "Campo obrigatório ausente: " +
                field
            );
        }
    }
}


function corsHeaders(
    env
) {
    const allowedOrigin =
        env.ALLOWED_ORIGIN ||
        "*";

    return {
        "Access-Control-Allow-Origin":
            allowedOrigin,

        "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS",

        "Access-Control-Allow-Headers":
            "Content-Type",

        "Content-Type":
            "application/json; charset=UTF-8"
    };
}


function jsonResponse(
    data,
    status,
    env
) {
    return new Response(
        JSON.stringify(
            data,
            null,
            2
        ),
        {
            status,

            headers:
                corsHeaders(
                    env
                )
        }
    );
}
