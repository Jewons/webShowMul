package com.redcdn.webShow.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.redcdn.webShow.ws.proxy.RestTemplateProxy;

public class LoginFilter implements Filter {

	protected static Logger logger = Logger.getLogger(LoginFilter.class);

	private static Set<String> ignoreUriSet = new HashSet<String>();

	private RestTemplateProxy proxy;

	static {
		ignoreUriSet.addAll(Arrays.asList(new String[] { "login.speak.action", "login.login.action", "allaction.sopReportBySid.action", "find.sendCode.action" }));
	}

	public void init(FilterConfig config) throws ServletException {
		String ignoreUrls = config.getInitParameter("ignoredUrls");
		if (!StringUtils.isEmpty(ignoreUrls)) {
			String[] ignoreUris = ignoreUrls.trim().split(",");
			for (String url : ignoreUris) {
				ignoreUriSet.add(url);
			}
		}
		setUp(config);
	}

	private void setUp(FilterConfig config) {
		ApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(config.getServletContext());
		proxy = context.getBean(RestTemplateProxy.class);
	}

	private boolean checkLogin(HttpServletRequest request, HttpServletResponse response, boolean needLogin) {
		try {
			return request.getSession().getAttribute("userlogin") != null;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	private long getExpireDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.YEAR, 10);
		return calendar.getTimeInMillis();
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		String requestUri = httpRequest.getRequestURI();
		String context = httpRequest.getContextPath() + "/";
		requestUri = requestUri.replaceFirst(context, "");
		if (requestUri.indexOf(".css") != -1 || (requestUri.indexOf(".js") != -1 && requestUri.indexOf(".jsp") == -1)) {
			httpServletResponse.setHeader("Cache-Control", "Max-Age=315360000");
			httpServletResponse.setDateHeader("Expires", getExpireDate());
			chain.doFilter(httpRequest, httpServletResponse);
			return;
		}
		boolean needLogin = !requestUri.endsWith(".jsp") && !ignoreUriSet.contains(requestUri);

		boolean logined = checkLogin(httpRequest, httpServletResponse, needLogin);
		if (needLogin) {
			if (!logined) {
				if (isAjax(httpRequest)) {
					logger.info("url is:[" + requestUri + "]");
					httpServletResponse.sendError(900, "NEED LOGIN");
					return;
				}

				httpServletResponse.sendRedirect(httpRequest.getContextPath() + "/login.jsp");
				return;
			}
		}
		chain.doFilter(httpRequest, httpServletResponse);
	}

	private boolean isAjax(HttpServletRequest request) {
		String header = request.getHeader("X-Requested-With");
		if (header != null && "XMLHttpRequest".equalsIgnoreCase(header)) {
			return true;
		} else {
			return false;
		}
	}

	public void destroy() {

	}

}
